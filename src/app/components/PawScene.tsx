import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Points,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Color,
  Fog,
  type Material,
} from "three";

/**
 * PawScene — a lightweight three.js scene for the 404 page.
 *
 * Floating golden paw prints drift and rotate in a navy star-field with
 * gentle mouse-parallax on the camera. Paws are built procedurally from
 * sphere primitives (one main pad + four toe pads) — no external models.
 *
 * - Respects `prefers-reduced-motion` (renders a single static frame).
 * - Falls back silently if WebGL is unavailable (CSS gradients remain).
 * - Fully disposes GPU resources on unmount.
 */

interface PawSpec {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  spin: number; // radians/second around own Y axis
  bobAmp: number;
  bobSpeed: number;
  phase: number;
  gold: boolean;
}

function makePaw(padMat: MeshStandardMaterial, toeMat: MeshStandardMaterial): Group {
  const paw = new Group();

  // Main pad — flattened bean
  const pad = new Mesh(new SphereGeometry(1, 24, 18), padMat);
  pad.scale.set(1.02, 0.5, 1.22);
  pad.position.set(0, -0.5, 0.14);
  paw.add(pad);

  // Four toe pads arranged in an arc above the main pad
  const toes = [
    { x: -0.88, y: 0.38, z: 0.02, r: 0.33, rot: 0.3 },
    { x: -0.31, y: 0.72, z: 0.08, r: 0.37, rot: 0.12 },
    { x: 0.31, y: 0.72, z: 0.08, r: 0.37, rot: -0.12 },
    { x: 0.88, y: 0.38, z: 0.02, r: 0.33, rot: -0.3 },
  ];
  for (const t of toes) {
    const toe = new Mesh(new SphereGeometry(t.r, 20, 16), toeMat);
    toe.scale.set(1, 0.78, 1.05);
    toe.position.set(t.x, t.y, t.z);
    toe.rotation.z = t.rot;
    paw.add(toe);
  }
  return paw;
}

function makeStars(count: number): Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const gold = new Color(0xd4af37);
  const white = new Color(0xcfd8e6);
  for (let i = 0; i < count; i++) {
    // Distribute in a wide shell around the camera view
    positions[i * 3] = (Math.random() - 0.5) * 42;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 2] = -4 - Math.random() * 26;
    const c = Math.random() < 0.3 ? gold : white;
    const dim = 0.45 + Math.random() * 0.55;
    colors[i * 3] = c.r * dim;
    colors[i * 3 + 1] = c.g * dim;
    colors[i * 3 + 2] = c.b * dim;
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  geo.setAttribute("color", new BufferAttribute(colors, 3));
  const mat = new PointsMaterial({
    size: 0.075,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false,
  });
  return new Points(geo, mat);
}

const PAW_LAYOUT: PawSpec[] = [
  { x: -5.6, y: 2.4, z: -1.0, scale: 1.25, rotX: 0.15, rotY: 0.4, rotZ: -0.12, spin: 0.22, bobAmp: 0.45, bobSpeed: 0.55, phase: 0.0, gold: true },
  { x: 5.8, y: 1.4, z: -2.5, scale: 1.0, rotX: -0.1, rotY: -0.5, rotZ: 0.18, spin: -0.18, bobAmp: 0.6, bobSpeed: 0.42, phase: 1.7, gold: true },
  { x: -2.4, y: -2.6, z: 1.2, scale: 0.8, rotX: 0.22, rotY: 0.9, rotZ: 0.1, spin: 0.3, bobAmp: 0.5, bobSpeed: 0.7, phase: 3.1, gold: false },
  { x: 3.1, y: -3.1, z: -0.4, scale: 0.95, rotX: -0.18, rotY: -0.7, rotZ: -0.22, spin: -0.26, bobAmp: 0.55, bobSpeed: 0.5, phase: 4.4, gold: true },
  { x: 0.4, y: 3.6, z: -4.0, scale: 1.4, rotX: 0.3, rotY: 0.2, rotZ: 0.08, spin: 0.14, bobAmp: 0.7, bobSpeed: 0.35, phase: 2.2, gold: false },
  { x: -7.4, y: -0.9, z: -5.5, scale: 1.1, rotX: 0.05, rotY: 0.6, rotZ: -0.05, spin: 0.2, bobAmp: 0.8, bobSpeed: 0.3, phase: 5.0, gold: true },
  { x: 7.6, y: 3.2, z: -6.5, scale: 0.9, rotX: -0.05, rotY: -0.3, rotZ: 0.25, spin: -0.16, bobAmp: 0.75, bobSpeed: 0.38, phase: 0.9, gold: false },
  { x: 1.8, y: 0.4, z: -9.0, scale: 1.7, rotX: 0.1, rotY: 0.5, rotZ: -0.15, spin: 0.1, bobAmp: 0.9, bobSpeed: 0.25, phase: 3.8, gold: true },
];

export function PawScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL capability probe — bail out silently (CSS gradient remains)
    let probe: WebGLRenderingContext | null = null;
    try {
      const canvas = document.createElement("canvas");
      probe = (canvas.getContext("webgl2") ||
        canvas.getContext("webgl")) as WebGLRenderingContext | null;
    } catch {
      probe = null;
    }
    if (!probe) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new Scene();
    scene.fog = new Fog(0x0a2540, 9, 30);

    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 13);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent — page gradient shows through
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // ── Materials ──────────────────────────────────────────────────────────
    const goldMat = new MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.75,
      roughness: 0.32,
      emissive: 0x6b5216,
      emissiveIntensity: 0.35,
    });
    const blueMat = new MeshStandardMaterial({
      color: 0x3e7cb1,
      metalness: 0.85,
      roughness: 0.28,
      emissive: 0x12253c,
      emissiveIntensity: 0.4,
    });

    const disposables: (Material | BufferGeometry)[] = [
      goldMat,
      blueMat,
    ];

    // ── Paws ───────────────────────────────────────────────────────────────
    const pawMeshes: { group: Group; spec: PawSpec }[] = [];
    for (const spec of PAW_LAYOUT) {
      const mat = spec.gold ? goldMat : blueMat;
      const paw = makePaw(mat, mat);
      paw.position.set(spec.x, spec.y, spec.z);
      paw.scale.setScalar(spec.scale);
      paw.rotation.set(spec.rotX, spec.rotY, spec.rotZ);
      scene.add(paw);
      pawMeshes.push({ group: paw, spec });
      paw.traverse((obj) => {
        if (obj instanceof Mesh) {
          disposables.push(obj.geometry);
        }
      });
    }

    // ── Stars ──────────────────────────────────────────────────────────────
    const stars = makeStars(320);
    scene.add(stars);
    disposables.push(stars.geometry, stars.material as Material);

    // ── Lights ─────────────────────────────────────────────────────────────
    const ambient = new AmbientLight(0x8899bb, 0.55);
    const key = new DirectionalLight(0xfff2cc, 1.6);
    key.position.set(6, 8, 6);
    const rim = new DirectionalLight(0x4a7fb5, 0.9);
    rim.position.set(-7, -4, 5);
    const warm = new PointLight(0xd4af37, 18, 40, 1.8);
    warm.position.set(0, 2, 6);
    scene.add(ambient, key, rim, warm);

    // ── Sizing ─────────────────────────────────────────────────────────────
    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (prefersReduced) renderer.render(scene, camera);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ── Mouse parallax ─────────────────────────────────────────────────────
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────────
    let raf = 0;
    const clockStart = performance.now();
    const tick = () => {
      const t = (performance.now() - clockStart) / 1000;
      for (const { group, spec } of pawMeshes) {
        group.rotation.y = spec.rotY + Math.sin(t * spec.spin * 2 + spec.phase) * 0.35 + t * spec.spin * 0.4;
        group.rotation.x = spec.rotX + Math.sin(t * spec.bobSpeed + spec.phase) * 0.12;
        group.position.y = spec.y + Math.sin(t * spec.bobSpeed + spec.phase) * spec.bobAmp;
      }
      stars.rotation.y = t * 0.012;
      stars.rotation.x = Math.sin(t * 0.05) * 0.02;

      camera.position.x += (targetX * 1.4 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -3);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (prefersReduced) {
      renderer.render(scene, camera); // single static frame
    } else {
      raf = requestAnimationFrame(tick);
    }

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}

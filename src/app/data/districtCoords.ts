/**
 * DISTRICT HQ COORDINATES — all 77 districts (keys match DISTRICTS names).
 *
 * Approximate headquarters positions (± a few km), which is well within
 * weather-model grid resolution (~11 km) for the Open-Meteo forecast API.
 * Derived from standard district-HQ geography (Google Maps / NAMASTE
 * settlement positions). The weather tool only needs representative
 * coordinates per district, not survey-grade points.
 */

export interface DistrictCoord {
  name: string;
  lat: number;
  lon: number;
}

export const DISTRICT_COORDS: DistrictCoord[] = [
  // Koshi
  { name: "Taplejung", lat: 27.35, lon: 87.67 },
  { name: "Panchthar", lat: 27.15, lon: 87.76 },
  { name: "Ilam", lat: 26.91, lon: 87.28 },
  { name: "Jhapa", lat: 26.54, lon: 88.09 },
  { name: "Morang", lat: 26.48, lon: 87.28 },
  { name: "Sunsari", lat: 26.66, lon: 87.27 },
  { name: "Dhankuta", lat: 26.98, lon: 87.34 },
  { name: "Tehrathum", lat: 27.13, lon: 87.55 },
  { name: "Sankhuwasabha", lat: 27.38, lon: 87.2 },
  { name: "Bhojpur", lat: 27.17, lon: 87.05 },
  { name: "Solukhumbu", lat: 27.52, lon: 86.6 },
  { name: "Okhaldhunga", lat: 27.32, lon: 86.5 },
  { name: "Khotang", lat: 27.15, lon: 86.8 },
  { name: "Udayapur", lat: 26.8, lon: 86.7 },
  // Madhesh
  { name: "Saptari", lat: 26.54, lon: 86.75 },
  { name: "Siraha", lat: 26.65, lon: 86.21 },
  { name: "Dhanusha", lat: 26.73, lon: 85.93 },
  { name: "Mahottari", lat: 26.64, lon: 85.8 },
  { name: "Sarlahi", lat: 26.86, lon: 85.56 },
  { name: "Rautahat", lat: 26.77, lon: 85.28 },
  { name: "Bara", lat: 27.03, lon: 84.97 },
  { name: "Parsa", lat: 27.01, lon: 84.88 },
  // Bagmati
  { name: "Dolakha", lat: 27.67, lon: 86.05 },
  { name: "Sindhupalchok", lat: 27.78, lon: 85.71 },
  { name: "Ramechhap", lat: 27.39, lon: 86.06 },
  { name: "Sindhuli", lat: 27.21, lon: 85.92 },
  { name: "Kavrepalanchok", lat: 27.62, lon: 85.55 },
  { name: "Bhaktapur", lat: 27.67, lon: 85.43 },
  { name: "Lalitpur", lat: 27.66, lon: 85.32 },
  { name: "Kathmandu", lat: 27.72, lon: 85.32 },
  { name: "Nuwakot", lat: 27.87, lon: 85.15 },
  { name: "Rasuwa", lat: 28.11, lon: 85.3 },
  { name: "Dhading", lat: 27.87, lon: 84.92 },
  { name: "Makwanpur", lat: 27.43, lon: 85.03 },
  { name: "Chitawan", lat: 27.68, lon: 84.43 },
  // Gandaki
  { name: "Manang", lat: 28.55, lon: 84.24 },
  { name: "Mustang", lat: 28.8, lon: 83.74 },
  { name: "Myagdi", lat: 28.35, lon: 83.57 },
  { name: "Kaski", lat: 28.21, lon: 83.99 },
  { name: "Lamjung", lat: 28.23, lon: 84.38 },
  { name: "Gorkha", lat: 28.0, lon: 84.63 },
  { name: "Tanahu", lat: 27.98, lon: 84.27 },
  { name: "Syangja", lat: 28.1, lon: 83.87 },
  { name: "Parbat", lat: 28.23, lon: 83.68 },
  { name: "Baglung", lat: 28.27, lon: 83.6 },
  { name: "Nawalparasi East", lat: 27.7, lon: 84.42 },
  // Lumbini
  { name: "Nawalparasi", lat: 27.5, lon: 84.2 },
  { name: "Rupandehi", lat: 27.5, lon: 83.45 },
  { name: "Kapilbastu", lat: 27.55, lon: 83.06 },
  { name: "Palpa", lat: 27.87, lon: 83.55 },
  { name: "Arghakhanchi", lat: 27.96, lon: 83.21 },
  { name: "Gulmi", lat: 28.06, lon: 83.25 },
  { name: "Pyuthan", lat: 28.1, lon: 82.87 },
  { name: "Rolpa", lat: 28.3, lon: 82.62 },
  { name: "Dang", lat: 28.13, lon: 82.3 },
  { name: "Banke", lat: 28.13, lon: 81.62 },
  { name: "Bardiya", lat: 28.28, lon: 81.61 },
  { name: "Rukum", lat: 28.6, lon: 82.75 },
  // Karnali
  { name: "Dolpa", lat: 28.93, lon: 82.9 },
  { name: "Mugu", lat: 29.56, lon: 82.11 },
  { name: "Humla", lat: 29.86, lon: 81.83 },
  { name: "Jumla", lat: 29.27, lon: 82.19 },
  { name: "Kalikot", lat: 29.15, lon: 81.61 },
  { name: "Dailekh", lat: 28.84, lon: 81.7 },
  { name: "Jajarkot", lat: 28.7, lon: 82.19 },
  { name: "Surkhet", lat: 28.6, lon: 81.62 },
  { name: "Salyan", lat: 28.38, lon: 82.11 },
  { name: "Rukum West", lat: 28.63, lon: 82.62 },
  // Sudurpashchim
  { name: "Bajura", lat: 29.36, lon: 81.42 },
  { name: "Bajhang", lat: 29.55, lon: 81.2 },
  { name: "Darchula", lat: 29.85, lon: 80.55 },
  { name: "Baitadi", lat: 29.53, lon: 80.47 },
  { name: "Dadeldhura", lat: 29.3, lon: 80.58 },
  { name: "Doti", lat: 29.28, lon: 80.95 },
  { name: "Achham", lat: 29.16, lon: 81.2 },
  { name: "Kailali", lat: 28.71, lon: 80.93 },
  { name: "Kanchanpur", lat: 28.85, lon: 80.21 },
];

export const coordByName = (name: string): DistrictCoord | undefined =>
  DISTRICT_COORDS.find((d) => d.name === name);

/** Haversine distance in km between two points — used to find the nearest
 *  district to a geolocation reading. */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la = (a.lat * Math.PI) / 180;
  const lb = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la) * Math.cos(lb) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestDistrict(lat: number, lon: number): DistrictCoord {
  let best = DISTRICT_COORDS[0];
  let bestD = Infinity;
  for (const d of DISTRICT_COORDS) {
    const dist = distanceKm({ lat, lon }, d);
    if (dist < bestD) {
      bestD = dist;
      best = d;
    }
  }
  return best;
}

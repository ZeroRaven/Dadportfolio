import { motion } from "motion/react";

export function AnimatedDog() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated Dog Illustration using SVG/CSS */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Dog Body */}
          <motion.ellipse
            cx="150"
            cy="180"
            rx="70"
            ry="50"
            fill="#D4A574"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Dog Head */}
          <motion.circle
            cx="150"
            cy="120"
            r="45"
            fill="#D4A574"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          
          {/* Snout */}
          <motion.ellipse
            cx="150"
            cy="135"
            rx="25"
            ry="18"
            fill="#C9975B"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
          />
          
          {/* Nose */}
          <motion.ellipse
            cx="150"
            cy="145"
            rx="8"
            ry="6"
            fill="#2D2D2D"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Left Ear */}
          <motion.ellipse
            cx="120"
            cy="95"
            rx="18"
            ry="30"
            fill="#C9975B"
            transform="rotate(-20 120 95)"
            animate={{
              rotate: [-20, -15, -20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Right Ear */}
          <motion.ellipse
            cx="180"
            cy="95"
            rx="18"
            ry="30"
            fill="#C9975B"
            transform="rotate(20 180 95)"
            animate={{
              rotate: [20, 25, 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Left Eye */}
          <motion.circle
            cx="135"
            cy="115"
            r="6"
            fill="#2D2D2D"
            animate={{
              scale: [1, 0.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Right Eye */}
          <motion.circle
            cx="165"
            cy="115"
            r="6"
            fill="#2D2D2D"
            animate={{
              scale: [1, 0.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Front Left Leg */}
          <motion.rect
            x="130"
            y="210"
            width="15"
            height="50"
            rx="7"
            fill="#C9975B"
            animate={{
              y: [210, 215, 210],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Front Right Leg */}
          <motion.rect
            x="155"
            y="210"
            width="15"
            height="50"
            rx="7"
            fill="#C9975B"
            animate={{
              y: [210, 215, 210],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Back Left Leg */}
          <motion.rect
            x="105"
            y="210"
            width="15"
            height="50"
            rx="7"
            fill="#C9975B"
            animate={{
              y: [210, 215, 210],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Back Right Leg */}
          <motion.rect
            x="180"
            y="210"
            width="15"
            height="50"
            rx="7"
            fill="#C9975B"
            animate={{
              y: [210, 215, 210],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* Tail */}
          <motion.path
            d="M 90 170 Q 70 160 75 140"
            stroke="#C9975B"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M 90 170 Q 70 160 75 140",
                "M 90 170 Q 70 160 80 135",
                "M 90 170 Q 70 160 75 140"
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Collar */}
          <motion.rect
            x="130"
            y="150"
            width="40"
            height="8"
            rx="4"
            fill="#8B5CF6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Collar Tag */}
          <motion.circle
            cx="150"
            cy="158"
            r="4"
            fill="#FCD34D"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Floating particles around the dog */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-violet-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Paw prints decoration */}
      <motion.div
        className="absolute bottom-10 left-10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="25" r="8" fill="#8B5CF6" opacity="0.3" />
          <circle cx="12" cy="15" r="5" fill="#8B5CF6" opacity="0.3" />
          <circle cx="28" cy="15" r="5" fill="#8B5CF6" opacity="0.3" />
          <circle cx="10" cy="8" r="4" fill="#8B5CF6" opacity="0.3" />
          <circle cx="30" cy="8" r="4" fill="#8B5CF6" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-20 right-20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 0.8, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="25" r="8" fill="#6366F1" opacity="0.3" />
          <circle cx="12" cy="15" r="5" fill="#6366F1" opacity="0.3" />
          <circle cx="28" cy="15" r="5" fill="#6366F1" opacity="0.3" />
          <circle cx="10" cy="8" r="4" fill="#6366F1" opacity="0.3" />
          <circle cx="30" cy="8" r="4" fill="#6366F1" opacity="0.3" />
        </svg>
      </motion.div>
    </div>
  );
}

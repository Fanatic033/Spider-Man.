// WebAnimation.tsx
import { motion } from "framer-motion";

const WebAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <svg
        viewBox="0 0 200 200"
        width="400"
        height="400"
        className="stroke-white"
      >
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="100"
          strokeWidth="2"
          stroke="white"
          animate={{ x2: 100, y2: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
};

export default WebAnimation;


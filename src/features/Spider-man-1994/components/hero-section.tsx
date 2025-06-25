import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="hero min-h-[60vh] relative">
      <div className="hero-content text-center text-white relative z-10">
        <div className="max-w-4xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
            style={{
              textShadow: "0 0 40px rgba(255, 0, 0, 0.3)",
              animation: "pulse 3s infinite",
            }}
          >
            SPIDER-MAN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl lg:text-2xl text-gray-300 leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10"
          >
            Откройте для себя все сериалы о вашем любимом супергерое
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

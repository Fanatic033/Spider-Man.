import { FC } from "react";
import { motion } from "framer-motion";
import { ShowCard } from "./show-card";
import { TMDBShow } from "@/features/types/types";

interface Props {
    shows: TMDBShow[];
    handleShowSelect: (show: TMDBShow) => void
}

export const ShowList:FC<Props> = ({shows,handleShowSelect}) => {
  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
          Сериалы про Человека-паука
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {shows && shows.length > 0 ? (
          shows.map((show: TMDBShow, index: number) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group"
            >
              <ShowCard show={show} handleShowSelect={handleShowSelect} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 ">
            <div className="text-6xl mb-6 opacity-70">🕷️</div>
            <p className="text-2xl text-black/75 mb-4 ">Сериалы не найдены</p>
            <p className="text-black/50">Попробуйте обновить страницу</p>
          </div>
        )}
      </div>
    </div>
  );
};

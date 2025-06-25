import { TMDBShow } from "@/features/types/types";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { PlayCircleIcon, Star } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface Props {
  show: TMDBShow;
  handleShowSelect: (show: TMDBShow) => void;
}

export const ShowCard: FC<Props> = ({ show, handleShowSelect }) => {
  return (
    <Card
      key={show.id}
      onClick={() => handleShowSelect(show)}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/70 border-slate-700/50    border  rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(255,71,87,0.2)] hover:border-[#ff4757]/50 cursor-pointer relative group"
    >
      <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 group-hover:left-full" />
      <CardHeader className="flex">
        <div className="relative w-full h-72 overflow-hidden ">
          {show.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              style={{
                borderRadius: "20%",
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 ">
              Нет изображения
            </div>
          )}
        </div>
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-3 whitespace-nowrap">
            {show.name}
          </h3>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 px-2 py-1 rounded-full text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{show.vote_average?.toFixed(1)}</span>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full text-sm">
              📅 {show.first_air_date?.split("-")[0]}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 text-white">
        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
          {show.overview || "Описание недоступно"}
        </p>
        <Button className="mt-5 w-full bg-gradient-to-r from-[#ff4757] to-[#ff6b7a] text-white font-semibold rounded-full py-2 hover:shadow-lg hover:-translate-y-1 transition-all">
          <PlayCircleIcon strokeWidth={2}  /> Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

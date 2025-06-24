import Image from "next/image";
import { FC } from "react";
import { Button } from "@/shared/utils/components/ui/button";
import { Card, CardContent } from "@/shared/utils/components/ui/card";
import { Star, Badge } from "lucide-react";
import { TMDBShow } from "@/features/types/types";

interface Props {
    show: TMDBShow
    handleShowSelect: (show: TMDBShow) => void
}

const ShowCard:FC<Props> = ({show,handleShowSelect}) => {
  return (
    <Card
      key={show.id}
      className="bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={() => handleShowSelect(show)}
    >
      <figure className="px-4 pt-4">
        {show.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            width={300}
            height={450}
            className="rounded-xl object-cover h-64 w-full"
          />
        ) : (
          <div className="w-full h-64 bg-base-300 rounded-xl flex items-center justify-center">
            <span className="text-base-content/50">Нет изображения</span>
          </div>
        )}
      </figure>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{show.name}</h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{show.vote_average?.toFixed(1)}</span>
          </div>
          <Badge>{show.first_air_date?.split("-")[0]}</Badge>
        </div>
        <p className="text-base-content/70 text-sm line-clamp-3">
          {show.overview || "Описание недоступно"}
        </p>
        <Button className="w-full mt-4 btn-primary">Подробнее</Button>
      </CardContent>
    </Card>
  );
};

export default ShowCard;

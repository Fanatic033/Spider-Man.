import { FC } from "react";
import Image from "next/image";
import { TMDBSeason, TMDBShow } from "@/features/types/types";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Badge, Star, Calendar, Clock } from "lucide-react";

interface Props {
  handleBackToShows: () => void;
  selectedShow: TMDBShow;
  seasons: TMDBSeason[];
}

export const ShowInfo: FC<Props> = ({
  handleBackToShows,
  selectedShow,
  seasons,
}) => {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-800/70 to-blue-600/90"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce">
        🕷️
      </div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-30 animate-pulse">
        🕸️
      </div>
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            {selectedShow.poster_path && (
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${selectedShow.poster_path}`}
                  alt={selectedShow.name}
                  width={250}
                  height={375}
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300 border-2 border-white/20"
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-2 text-white space-y-6">
            <Button
              variant="ghost"
              onClick={handleBackToShows}
              className="text-white hover:bg-white/20 mb-4 group border border-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Назад к сериалам
            </Button>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-400 via-white to-blue-400 bg-clip-text text-transparent animate-pulse">
                {selectedShow.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 backdrop-blur-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {selectedShow.vote_average?.toFixed(1)}
                </Badge>
                <Badge className="text-blue-300 border-blue-400/50 backdrop-blur-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {selectedShow.first_air_date?.split("-")[0]}
                </Badge>
                <Badge className="text-green-300 border-green-400/50 backdrop-blur-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {seasons?.length} сезон{seasons?.length !== 1 ? "ов" : ""}
                </Badge>
              </div>

              <p className="text-lg text-gray-200 leading-relaxed max-w-3xl backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
                {selectedShow.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

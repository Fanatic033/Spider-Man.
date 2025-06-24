import { FC } from "react";
import Image from "next/image";
import { TMDBSeason } from "@/features/types/types";
import { Badge, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

interface Props {
  season: TMDBSeason;
  handleSeasonClick: (season_number: number) => void
  selectedSeason: number | null
}

const SeasonCard: FC<Props> = ({ season,handleSeasonClick,selectedSeason }) => {
  return (
    <Card key={season.id} className="bg-base-100 shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {season.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
              alt={season.name}
              width={100}
              height={150}
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white">{season.name}</h3>
              <Badge className="bg-primary text-primary-content">
                {season.episode_count} эпизодов
              </Badge>
            </div>
            <p className="text-base-content/70 mb-4">{season.overview}</p>
            <Button
              onClick={() => handleSeasonClick(season.season_number)}
              className="btn-primary"
            >
              {selectedSeason === season.season_number ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Скрыть эпизоды
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Показать эпизоды
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonCard
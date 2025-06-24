"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { TMDBEpisode } from "@/features/types/types";
import { Clock, Play, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  episode: TMDBEpisode;
  showId?: number;
  seasonNumber?: number;
}

const getVideoUrl = (
  showId: number,
  seasonNumber: number,
  episodeNumber: number
): string => {
  const videoUrls: { [key: string]: string } = {
    "888-1-1": "https://play.boomstream.com/OVLHwdGD",
    "888-1-2": "https://play.boomstream.com/c2GPJlCC",
    "888-1-3": "https://play.boomstream.com/BYazsFX7",
    "888-1-4": "https://play.boomstream.com/uTs15fGl",
    "888-1-5": "https://play.boomstream.com/6aleSPXU",
    "888-1-6": "https://play.boomstream.com/AuktGSw3",
    "888-1-7": "https://play.boomstream.com/kgsY4UKO",
    "888-1-8": "https://play.boomstream.com/xZLjzjE9",
    "888-1-9": "https://play.boomstream.com/UpqUqJdT",
    "888-1-10": "https://play.boomstream.com/Qk5kUXct",
    "888-1-11": "https://play.boomstream.com/6U8PLgtO",
    "888-1-12": "https://play.boomstream.com/sUQXEJX4",
    "888-1-13": "https://play.boomstream.com/CY8DaFTH",
  };

  const key = `${showId}-${seasonNumber}-${episodeNumber}`;
  return videoUrls[key] || "";
};

const EpisodeCard: FC<Props> = ({ episode, showId, seasonNumber }) => {
  const [open, setOpen] = useState(false);

  const videoUrl =
    showId && seasonNumber
      ? getVideoUrl(showId, seasonNumber, episode.episode_number)
      : "";
  const hasVideo = Boolean(videoUrl);

  return (
    <>
      <Card className="bg-base-100 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold mb-4">
                {episode.episode_number}
              </div>
              {episode.still_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
                  alt={episode.name}
                  width={200}
                  height={113}
                  className="rounded-lg"
                />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">{episode.name}</h4>
                <div className="flex items-center gap-4 text-sm text-base-content/70">
                  {episode.runtime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{episode.runtime} мин</span>
                    </div>
                  )}
                  <span>{episode.air_date}</span>
                </div>
              </div>
              <p className="text-base-content/80 mb-4 line-clamp-3">
                {episode.overview}
              </p>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className={hasVideo ? "btn-primary" : "btn-disabled"}
                    disabled={!hasVideo}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {hasVideo ? "Смотреть" : "Недоступно"}
                  </Button>
                </DialogTrigger>

                {open && hasVideo && (
                  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <iframe
                        src={videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                        frameBorder="0"
                        title={episode.name}
                      />
                      <Button
                        onClick={() => setOpen(false)}
                        size="sm"
                        variant="ghost"
                        className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EpisodeCard;

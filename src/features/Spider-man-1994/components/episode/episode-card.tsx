"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { TMDBEpisode } from "@/features/types/types";
import { Clock, Play, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { getVideoUrl } from "@/shared/lib/getVideoUrl";
import ReactDOM from "react-dom";

interface Props {
  episode: TMDBEpisode;
  showId?: number;
  seasonNumber?: number;
}

export const EpisodeCard: FC<Props> = ({ episode, showId, seasonNumber }) => {
  const [open, setOpen] = useState(false);

  const videoUrl =
    showId && seasonNumber
      ? getVideoUrl(showId, seasonNumber, episode.episode_number)
      : "";
  const hasVideo = Boolean(videoUrl);

  return (
    <>
      <Card className="bg-base-100 shadow-md hover:shadow-lg transition-shadow ">
        <CardContent className="p-3">
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
              <p className="text-base-content/80 mb-4 line-clamp-3 leading-7 [&:not(:first-child)]:mt-6">
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

                {open &&
                  hasVideo &&
                  typeof window !== "undefined" &&
                  document.body &&
                  ReactDOM.createPortal(
                    <div className="fixed inset-0 z-[1000] bg-black">
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
                        className="absolute top-4 right-4 z-[1001] bg-black/50 text-white hover:bg-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>,
                    document.body
                  )}
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

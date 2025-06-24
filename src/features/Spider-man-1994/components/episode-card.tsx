"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { TMDBEpisode } from "@/features/types/types";
import { Button } from "@/shared/utils/components/ui/button";
import { Card, CardContent } from "@/shared/utils/components/ui/card";
import { Clock, Play, X, Maximize2 } from "lucide-react";

interface Props {
  episode: TMDBEpisode;
  showId?: number;
  seasonNumber?: number;
}

// Функция для получения URL видео (здесь вы можете добавить свою логику)
const getVideoUrl = (
  showId: number,
  seasonNumber: number,
  episodeNumber: number
): string => {
  // Пример маппинга для Spider-Man 1994
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoUrl =
    showId && seasonNumber
      ? getVideoUrl(showId, seasonNumber, episode.episode_number)
      : "";
  const hasVideo = Boolean(videoUrl);

  // Отладка - выводим информацию в консоль
  console.log("EpisodeCard Debug:", {
    showId,
    seasonNumber,
    episodeNumber: episode.episode_number,
    key: `${showId}-${seasonNumber}-${episode.episode_number}`,
    videoUrl,
    hasVideo,
  });

  const handlePlayClick = () => {
    if (hasVideo) {
      setIsPlaying(true);
    }
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className={hasVideo ? "btn-primary" : "btn-disabled"}
                  onClick={handlePlayClick}
                  disabled={!hasVideo}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {hasVideo ? "Смотреть" : "Недоступно"}
                </Button>
                {!hasVideo && (
                  <span className="text-sm text-base-content/50 self-center">
                    Эпизод пока недоступен
                  </span>
                )}
              </div>

              {/* Встроенный плеер */}
              <dialog id="modal" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  {isPlaying && hasVideo && !isFullscreen && (
                    <div className="mt-4 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Сейчас смотрите: {episode.name}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={toggleFullscreen}
                            className="h-8 w-8 p-0"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleClosePlayer}
                            className="h-8 w-8 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                          src={videoUrl}
                          className="w-full h-full"
                          allowFullScreen
                          frameBorder="0"
                          title={episode.name}
                        />
                      </div>
                    </div>
                  )}
                  <p className="py-4">
                    Press ESC key or click on ✕ button to close
                  </p>
                </div>
              </dialog>
              {/* {isPlaying && hasVideo && !isFullscreen && (
                <div className="mt-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Сейчас смотрите: {episode.name}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={toggleFullscreen}
                        className="h-8 w-8 p-0"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleClosePlayer}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      frameBorder="0"
                      title={episode.name}
                    />
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Полноэкранный плеер */}
      {isPlaying && hasVideo && isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleFullscreen}
                className="bg-black/50 text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allowFullScreen
              frameBorder="0"
              title={episode.name}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeCard;

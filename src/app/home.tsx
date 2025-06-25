"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetEpisodes,
  useGetSeasons,
  useGetShows,
} from "@/features/Spider-man-1994/hooks";
import { useSound } from "@/shared/hooks/useSound";
import {
  EpisodeCard,
  SeasonCard,
  ShowCard,
} from "@/features/Spider-man-1994/components";
import { Button } from "@/shared/components/ui/button";
import { TMDBShow } from "@/features/types/types";
import { containerVariants, itemVariants } from "@/shared/lib/utils";
import { ArrowLeft, Calendar, Star } from "lucide-react";

const Home = () => {
  const [selectedShow, setSelectedShow] = useState<TMDBShow | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const playWebSound = useSound("/sounds/web.mp3", 0.1);

  const { shows, isShowsLoading } = useGetShows();
  const { data: seasons } = useGetSeasons(
    selectedShow?.id ?? null,
    !!selectedShow
  );
  const { data: episodes, isLoading: isEpisodesLoading } = useGetEpisodes(
    selectedShow?.id ?? null,
    selectedSeason,
    !!selectedShow && selectedSeason !== null
  );

  const handleShowSelect = (show: TMDBShow) => {
    playWebSound();
    setSelectedShow(show);
    setSelectedSeason(null);
  };

  const handleSeasonClick = (seasonNumber: number) => {
    setSelectedSeason((prev) => (prev === seasonNumber ? null : seasonNumber));
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  if (isShowsLoading || !shows) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (selectedShow) {
    return (
      <div className="min-h-screen bg-base-200">
        {/* Header */}
        <div className="relative h-96 bg-gradient-to-r from-red-600 to-blue-600">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="flex gap-8 items-center">
              {selectedShow.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${selectedShow.poster_path}`}
                  alt={selectedShow.name}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-2xl"
                />
              )}
              <div className="text-white space-y-4">
                <Button
                  variant="ghost"
                  onClick={handleBackToShows}
                  className="text-white hover:bg-white/20 mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к сериалам
                </Button>
                <h1 className="text-4xl font-bold">{selectedShow.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedShow.vote_average?.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedShow.first_air_date?.split("-")[0]}</span>
                  </div>
                </div>
                <p className="max-w-2xl text-gray-200">
                  {selectedShow.overview}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seasons and episodes */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Сезоны</h2>
          <div className="space-y-6">
            {seasons?.map((season) => (
              <div key={season.id} className="space-y-4">
                <SeasonCard
                  season={season}
                  handleSeasonClick={handleSeasonClick}
                  selectedSeason={selectedSeason}
                />

                {selectedSeason === season.season_number && (
                  <div className="ml-4 space-y-4">
                    {isEpisodesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="loading loading-spinner loading-md text-primary"></div>
                      </div>
                    ) : (
                      <AnimatePresence>
                        <motion.div
                          key={`episodes-${season.id}`}
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {episodes?.map((episode) => (
                            <motion.div
                              key={episode.id}
                              variants={itemVariants}
                            >
                              <EpisodeCard
                                episode={episode}
                                showId={selectedShow.id}
                                seasonNumber={season.season_number}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show list
  return (
    <div
      className="min-h-screen bg-base-200"
      style={{ backgroundImage: "url('/bg-2.jpg')" }}
    >
      <div className="hero h-full">
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1
              className="mb-5 text-5xl font-bold"
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ff0000, #ffffff, #0000ff)",
                backgroundClip: "text",
                marginBottom: "1rem",
                textShadow: "0 0 30px rgba(255, 0, 0, 0.5)",
                animation: "pulse 2s infinite",
              }}
            >
              Spider-Man
            </h1>
            <p className="mb-5 text-xl">
              Откройте для себя все сериалы о вашем любимом супергерое
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Сериалы про Человека-паука
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map((show: TMDBShow) => (
            <ShowCard
              key={show.id}
              show={show}
              handleShowSelect={handleShowSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

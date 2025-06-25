"use client";

import {
    HeroSection,
    SeasonCard,
    ShowInfo
} from "@/features/Spider-man-1994/components";
import { EpisodeList } from "@/features/Spider-man-1994/components/episode/episode-list";
import { ShowList } from "@/features/Spider-man-1994/components/show/show-list";
import {
    useGetEpisodes,
    useGetSeasons,
    useGetShows,
} from "@/features/Spider-man-1994/hooks";
import { TMDBShow } from "@/features/types/types";
import { BgMain } from "@/shared/components/shared/background";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useSound } from "@/shared/hooks/useSound";
import { motion } from "framer-motion";
import { useState } from "react";

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

  if (isShowsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-blue-900/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading loading-spinner loading-lg text-red-500"></div>
          <p className="text-white/70">Загружаем сериалы...</p>
        </div>
      </div>
    );
  }

  if (selectedShow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/10 to-blue-900/10">
        <ShowInfo
          handleBackToShows={handleBackToShows}
          selectedShow={selectedShow}
          seasons={seasons ?? []}
        />

        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              Сезоны
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {seasons?.map((season, index) => (
              <motion.div
                key={season.id}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
                  <CardContent className="p-0">
                    <SeasonCard
                      season={season}
                      handleSeasonClick={handleSeasonClick}
                      selectedSeason={selectedSeason}
                    />
                  </CardContent>
                </Card>

                {selectedSeason === season.season_number && (
                  <div className="ml-6 space-y-4">
                    {isEpisodesLoading ? (
                      <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-sm">
                        <CardContent className="flex items-center justify-center py-12">
                          <div className="text-center space-y-4">
                            <div className="loading loading-spinner loading-md text-red-500"></div>
                            <p className="text-white/70">
                              Загружаем эпизоды...
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <EpisodeList
                        season={season}
                        episodes={episodes || []}
                        selectedShow={selectedShow}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/10 to-blue-900/10 relative overflow-hidden">
      <BgMain />
      <HeroSection />
      <ShowList shows={shows} handleShowSelect={handleShowSelect} />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;

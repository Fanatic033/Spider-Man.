"use client";

import { getSpiderManSeries } from "@/features/services/spider-man.service";
import EpisodeCard from "@/features/Spider-man-1994/components/episode-card";
import SeasonCard from "@/features/Spider-man-1994/components/season-card";
import ShowCard from "@/features/Spider-man-1994/components/show-card";
import { TMDBEpisode, TMDBSeason, TMDBShow } from "@/features/types/types";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Calendar, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [shows, setShows] = useState<TMDBShow[]>([]);
  const [selectedShow, setSelectedShow] = useState<TMDBShow | null>(null);
  const [seasons, setSeasons] = useState<TMDBSeason[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState<{
    [key: number]: TMDBEpisode[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSpiderManSeries();
        setShows(result);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowSelect = async (show: TMDBShow) => {
    setSelectedShow(show);
    setLoading(true);
    setSeasonEpisodes({});
    setSelectedSeason(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ru-RU`
      );
      const showDetails = await response.json();
      setSeasons(showDetails.seasons || []);
    } catch (error) {
      console.error("Error fetching seasons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonClick = async (seasonNumber: number) => {
    if (selectedSeason === seasonNumber) {
      setSelectedSeason(null);
      return;
    }

    setSelectedSeason(seasonNumber);

    if (seasonEpisodes[seasonNumber]) {
      return;
    }

    setEpisodeLoading((prev) => ({ ...prev, [seasonNumber]: true }));

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${selectedShow?.id}/season/${seasonNumber}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ru-RU`
      );
      const seasonDetails = await response.json();
      setSeasonEpisodes((prev) => ({
        ...prev,
        [seasonNumber]: seasonDetails.episodes || [],
      }));
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setEpisodeLoading((prev) => ({ ...prev, [seasonNumber]: false }));
    }
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
    setSeasons([]);
    setSelectedSeason(null);
    setSeasonEpisodes({});
    setEpisodeLoading({});
  };

  if (loading && shows.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (selectedShow) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="relative h-96 bg-gradient-to-r from-red-600 to-blue-600">
          <div className="absolute inset-0 bg-black/50"></div>
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

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Сезоны</h2>
          <div className="space-y-6">
            {seasons.map((season) => (
              <div key={season.id} className="space-y-4">
                <SeasonCard
                  season={season}
                  handleSeasonClick={handleSeasonClick}
                  selectedSeason={selectedSeason}
                />

                {selectedSeason === season.season_number && (
                  <div className="ml-4 space-y-4">
                    {episodeLoading[season.season_number] ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="loading loading-spinner loading-md text-primary"></div>
                      </div>
                    ) : (
                      seasonEpisodes[season.season_number]?.map((episode) => (
                        <EpisodeCard
                          episode={episode}
                          key={episode.id}
                          showId={selectedShow.id}
                          seasonNumber={season.season_number}
                        />
                      ))
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

  return (
    <div
      className="min-h-screen bg-base-200"
      style={{ backgroundImage: "url('/bg-2.jpg')" }}
    >
      {/* Hero Section */}
      <div className="hero h-full ">
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Spider-Man</h1>
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
          {shows.map((show) => (
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

export default HomePage;

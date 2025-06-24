// lib/tmdb.ts

import { instance } from "@/shared/utils/instance";

export const getSpiderManSeries = async () => {
  const { data } = await instance.get("/search/tv", {
    params: {
      query: "Spider-Man",
      first_air_date_year: 1994,
    },
  });

  return data.results;
};

export const getSeasons = async (tvId: number) => {
    const { data } = await instance.get(`/tv/${tvId}`, {
      params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
    });
    return data.seasons;
  };
  
  export const getEpisodes = async (tvId: number, seasonNumber: number) => {
    const { data } = await instance.get(`/tv/${tvId}/season/${seasonNumber}`, {
      params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
    });
    return data;
  };



import { instance } from "@/shared/api/instance";

class SpiderManService {
  public async GetShow() {
    try {
      const queries = [
        { query: "Spider-Man", year: 1994 },
        { query: "Ultimate Spider-Man", year: 2012 },
      ];

      const results = await Promise.all(
        queries.map(({ query, year }) =>
          instance.get("/search/tv", {
            params: {
              query,
              first_air_date_year: year,
              language: "ru-RU",
            },
          })
        )
      );

      return results.flatMap((res) => res.data.results);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async GetSeason(tvId: number) {
    try {
      const { data } = await instance.get(`/tv/${tvId}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          language: "ru-RU",
        },
      });
      return data.seasons;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async GetEpisodes(tvId: number, seasonNumber: number) {
    try {
      const { data } = await instance.get(
        `/tv/${tvId}/season/${seasonNumber}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            language: "ru-RU",
          },
        }
      );
      return data.episodes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const spiderManService = new SpiderManService();

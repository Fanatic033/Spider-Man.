import { useQuery } from "@tanstack/react-query";
import { TMDBEpisode } from "@/features/Spider-man/types/types";
import { spiderManService } from "../services/spider-man.service";

export const useGetEpisodes = (
  tvId: number | null,
  seasonNumber: number | null,
  enabled: boolean = true
) => {
  return useQuery<TMDBEpisode[]>({
    queryKey: ["spider-man-episodes", tvId, seasonNumber],
    queryFn: () => {
      if (tvId === null || seasonNumber === null) {
        throw new Error("TV ID and Season Number are required");
      }
      return spiderManService.GetEpisodes(tvId, seasonNumber);
    },
    enabled: enabled && tvId !== null && seasonNumber !== null,
  });
};

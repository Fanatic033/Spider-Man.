import { useQuery } from "@tanstack/react-query";
import { TMDBSeason } from "@/features/Spider-man/types/types";
import { spiderManService } from "../services/spider-man.service";

export const useGetSeasons = (
  tvId: number | null,
  enabled: boolean = true
) => {
  return useQuery<TMDBSeason[]>({
    queryKey: ["spider-man-seasons", tvId],
    queryFn: () => {
      if (!tvId) throw new Error("TV ID is required");
      return spiderManService.GetSeason(tvId);
    },
    enabled: enabled && !!tvId,
  });
};

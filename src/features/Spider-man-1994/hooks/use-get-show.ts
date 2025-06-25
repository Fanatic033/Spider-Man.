import { useQuery } from "@tanstack/react-query";
import { spiderManService } from "../services/spider-man.service";


export const useGetShows = () => {
  const {
    data: shows,
    isLoading: isShowsLoading,
    isError: isShowsError,
  } = useQuery({
    queryKey: ["spider-man-shows"],
    queryFn: () => spiderManService.GetShow(),
  });

  return { shows, isShowsLoading, isShowsError };
};

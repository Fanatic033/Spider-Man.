import { videoUrls } from "../constants/constants";

export const getVideoUrl = (
    showId: number,
    seasonNumber: number,
    episodeNumber: number
  ): string => {
    const key = `${showId}-${seasonNumber}-${episodeNumber}`;
    return videoUrls[key] || "";
  };
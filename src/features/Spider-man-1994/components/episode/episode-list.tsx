import { Card, CardContent } from "@/shared/components/ui/card";
import { containerVariants, itemVariants } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { EpisodeCard } from "./episode-card";
import { TMDBEpisode, TMDBSeason, TMDBShow } from "@/features/types/types";
import { FC } from "react";

interface Props {
  season: TMDBSeason;
  episodes: TMDBEpisode[];
  selectedShow: TMDBShow;
}

export const EpisodeList: FC<Props> = ({ season, episodes,selectedShow }) => {
  return (
    <div>
    <AnimatePresence>
      <motion.div
        key={`episodes-${season.id}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-4"
      >
        {episodes?.map((episode, episodeIndex) => (
          <motion.div
            key={episode.id}
            variants={itemVariants}
            custom={episodeIndex}
          >
            <Card className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 border-slate-700/40 backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/5 hover:border-red-500/20 transition-all duration-300 group">
              <CardContent className="p-0">
                <EpisodeCard
                  episode={episode}
                  showId={selectedShow.id}
                  seasonNumber={season.season_number}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
    </div>

  );
};

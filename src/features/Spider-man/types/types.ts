export interface TMDBShow {
    id: number
    name: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    first_air_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
    origin_country: string[]
    original_language: string
    original_name: string
    popularity: number
  }
  
  export interface TMDBSeason {
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    episode_count: number
    air_date: string
  }
  
  export interface TMDBEpisode {
    id: number
    name: string
    overview: string
    episode_number: number
    season_number: number
    air_date: string
    runtime: number | null
    still_path: string | null
    vote_average: number
    vote_count: number
  }
  
  export interface TMDBShowDetails extends TMDBShow {
    seasons: TMDBSeason[]
    number_of_seasons: number
    number_of_episodes: number
    status: string
    type: string
    genres: Array<{
      id: number
      name: string
    }>
  }
  
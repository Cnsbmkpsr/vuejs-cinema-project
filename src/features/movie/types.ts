export type Movie = {
  id: number
  title: string
  originalTitle?: string
  name?: string
  originalName?: string
  mediaType: 'movie' | 'tv'
  overview: string
  voteAverage: number
  voteCount: number
  releaseDate?: string
  firstAirDate?: string
  genreIds: number[]
  popularity: number
  posterPath?: string
  backdropPath?: string
  adult?: boolean
}

export type TVSeries = Movie

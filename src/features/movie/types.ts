export type Movie = {
  id: number
  title: string
  original_title?: string
  name?: string
  original_name?: string
  media_type: 'movie' | 'tv'
  overview: string
  vote_average: number
  vote_count: number
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  popularity: number
  poster_path?: string
  backdrop_path?: string
  adult?: boolean
}

export type PaginatedResponse<T> = {
  page: number
  results: T
  total_pages: number
  total_results: number
}

export type Genre = {
  id: number
  name: string
}

export type TVSeries = Movie

export type SortTypes = 'popularity' | 'vote_average' | 'release_date'
export type SortOrders = 'asc' | 'desc'
export type Sorts = `${SortTypes}.${SortOrders}`

export interface MoviesServiceInterface {
  getMovies(args: {
    page?: number
    genres?: number[]
    sortBy?: Sorts
  }): Promise<PaginatedResponse<Movie[]>>
  getMovie(id: number): Promise<Movie | null>
  searchMovies(args: { query: string; page?: number }): Promise<PaginatedResponse<Movie[]>>
}

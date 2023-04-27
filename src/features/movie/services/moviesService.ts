// src/features/movie/services/moviesService.ts

import type { Movie, MoviesServiceInterface, PaginatedResponse, Sorts } from '../types'
import { inject, injectable } from 'inversify'
import { ApiService } from '../../../services/apiService'

@injectable()
export class MoviesService implements MoviesServiceInterface {
  public constructor(@inject(ApiService) private readonly apiService: ApiService) {}

  getMovies(args: {
    page?: number
    sortBy?: Sorts
    genres?: number[]
  }): Promise<PaginatedResponse<Movie[]>> {
    return this.apiService
      .withEndpoint(`discover/movie`)
      .withPage(args.page ?? 1)
      .withGenres(args.genres ?? [])
      .sortBy(args.sortBy ?? 'popularity.desc')
      .launchRequest<PaginatedResponse<Movie[]>>()
  }

  getMovie(id: number): Promise<Movie | null> {
    return this.apiService.withEndpoint(`movie/${id}`).launchRequest<Movie>()
  }

  searchMovies(args: { query: string; page?: number }): Promise<PaginatedResponse<Movie[]>> {
    return this.apiService
      .withEndpoint(`search/movie`)
      .withSearch(args.query)
      .withPage(args.page ?? 1)
      .launchRequest<PaginatedResponse<Movie[]>>()
  }
}

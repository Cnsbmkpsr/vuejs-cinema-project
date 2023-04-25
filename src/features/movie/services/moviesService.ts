import { catchError, first, map, type Observable } from 'rxjs'
import type { Movie, MoviesServiceInterface, PaginatedResponse } from '../types'
import { ajax } from 'rxjs/ajax'

const apiKey = import.meta.env.VITE_MOVIE_API_KEY

export class MoviesService implements MoviesServiceInterface {
  getMovies(page?: number): Observable<PaginatedResponse<Movie[]>> {
    return ajax({
      url: 'https://api.themoviedb.org/3/discover/movie',
      queryParams: {
        api_key: apiKey,
        sort_by: 'popularity.desc',
        page: page || 1
      }
    }).pipe(
      map((result) => {
        return result.response as PaginatedResponse<Movie[]>
      }),
      catchError((error) => {
        console.error('Error fetching movies:', error)
        return []
      }),
      first()
    )
  }

  getMovie(id: number): Observable<Movie> {
    throw new Error('Method not implemented.')
  }
}

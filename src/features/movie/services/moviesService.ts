// src/features/movie/services/moviesService.ts

import { first, from, of, type Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import type { Genre, Movie, MoviesServiceInterface, PaginatedResponse } from '../types'
import { catchError, map } from 'rxjs/operators'

const apiKey = import.meta.env.VITE_MOVIE_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export class MoviesService implements MoviesServiceInterface {
  getMovies(page?: number, selectedGenres: Genre[] = []): Observable<PaginatedResponse<Movie[]>> {
    const genreFilter =
      selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.map((genre) => genre.id).join(',')}`
        : ''

    return ajax({
      url: `${BASE_URL}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${
        page || 1
      }${genreFilter}`,
      method: 'GET'
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

  getMovie(id: number): Observable<Movie | null> {
    return ajax.getJSON(`${BASE_URL}/movie/${id}?api_key=${apiKey}&language=en-US`).pipe(
      map((result) => result as Movie),
      catchError((error) => {
        console.error('Error fetching movie:', error)
        return of(null)
      }),
      first()
    )
  }

  // Je suis progressiste alors j'ai mis une fonction pour récupérer les genres
  getGenres(): Observable<Genre[]> {
    return ajax({
      url: `${BASE_URL}/genre/movie/list`,
      queryParams: {
        api_key: apiKey,
        language: 'en-US'
      }
    }).pipe(
      map((result) => {
        return result.response.genres as Genre[]
      }),
      catchError((error) => {
        console.error('Error fetching genres:', error)
        return []
      }),
      first()
    )
  }

  searchMovies = (query: string, page?: number): Observable<PaginatedResponse<Movie[]>> => {
    if (!query) {
      return of({ page: 1, results: [], total_pages: 0, total_results: 0 })
    }

    return ajax({
      url: `${BASE_URL}/search/movie`,
      queryParams: {
        api_key: apiKey,
        query,
        page: page || 1
      }
    }).pipe(
      map((result) => {
        return result.response as PaginatedResponse<Movie[]>
      }),
      catchError((error) => {
        console.error('Error searching movies:', error)
        return of({ page: 1, results: [], total_pages: 0, total_results: 0 })
      }),
      first()
    )
  }
}

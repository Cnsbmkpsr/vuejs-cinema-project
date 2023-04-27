import { injectable } from 'inversify'
import { catchError, first, firstValueFrom, map } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import type { Sorts } from '../features/movie/types'

const apiKey = import.meta.env.VITE_MOVIE_API_KEY
const baseUrl = import.meta.env.VITE_BASE_URL

export interface ApiServiceInterface {
  withGenres(genres: number[]): this
  sortBy(sortBy: string): this
  buildUrl(): string
  launchRequest<T>(): Promise<T>
  withPage(page: number): this
  withEndpoint(endpoint: string): this
  withSearch(query: string): this
}

@injectable()
export class ApiService implements ApiServiceInterface {
  endpoint: string
  private params: URLSearchParams

  constructor() {
    this.endpoint = 'discover/movie'
    this.params = new URLSearchParams()
    this.params.set('api_key', apiKey)
  }

  withEndpoint(endpoint: string) {
    this.endpoint = endpoint
    return this
  }

  withGenres(genres: number[]) {
    this.params.set('with_genres', genres.join(','))
    return this
  }

  sortBy(sortBy: Sorts) {
    this.params.set('sort_by', sortBy)
    return this
  }

  withPage(page: number) {
    this.params.set('page', page.toString())
    return this
  }

  withSearch(query: string) {
    this.params.set('query', query)
    return this
  }

  buildUrl() {
    return `${baseUrl}/${this.endpoint}?${this.params.toString()}`
  }

  launchRequest<T>(): Promise<T> {
    const url = this.buildUrl()
    return firstValueFrom(
      ajax(url).pipe(
        map((result) => {
          return result.response as T
        }),
        catchError((error) => {
          console.error('Error fetching movies:', error)
          return []
        }),
        first()
      )
    )
  }
}

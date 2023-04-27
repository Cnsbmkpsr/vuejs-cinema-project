import type { Genre, GenreServiceInterface } from '../types'
import { inject, injectable } from 'inversify'
import { ApiService } from '../../../services/apiService'

@injectable()
export class GenreService implements GenreServiceInterface {
  public constructor(@inject(ApiService) private readonly apiService: ApiService) {}

  getGenres(): Promise<{ genres: Genre[] }> {
    return this.apiService.withEndpoint(`genre/movie/list`).launchRequest<{ genres: Genre[] }>()
  }
}

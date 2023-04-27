export type Genre = { name: string; id: number }

export interface GenreServiceInterface {
  getGenres(): Promise<{ genres: Genre[] }>
}

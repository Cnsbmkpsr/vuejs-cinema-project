// store.ts
import type { Movie } from './types'
import { defineStore } from 'pinia'
import { BehaviorSubject } from 'rxjs'

const apiKey = import.meta.env.VITE_MOVIE_API_KEY

const fetchMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
    )
    const data = await response.json()
    return data.results as Movie[]
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export const useMovieStore = defineStore('movies', () => {
  const movies = new BehaviorSubject<Movie[]>([])

  const loadMovies = async () => {
    console.log('load movies')
    const fetchedMovies = await fetchMovies()
    console.log('Fetched movies:', fetchedMovies)
    movies.next(fetchedMovies)
  }

  return {
    movies,
    loadMovies
  }
})

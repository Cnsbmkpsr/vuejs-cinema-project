// store.ts
import type { Movie } from './types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MoviesService } from './services/moviesService'
import type { Observable } from 'rxjs'

export const useMovieStore = defineStore('movies', () => {
  const moviesService = new MoviesService()

  const movies = ref<Movie[]>([])
  const page = ref(1)
  const totalPages = ref(0)

  const loadMovies = async () => {
    if (movies.value?.length && movies.value.length > 0) {
      return
    }
    moviesService.getMovies().subscribe((response) => {
      movies.value = response.results
      page.value = response.page
      totalPages.value = response.total_pages
    })
  }

  const getMovie = (id: number): Observable<Movie | null> => {
    return moviesService.getMovie(id)
  }

  const fetchNextPage = async () => {
    if (page.value === totalPages.value) {
      return
    }
    moviesService.getMovies(page.value + 1).subscribe((response) => {
      movies.value = [...movies.value, ...response.results]
      page.value = response.page
      totalPages.value = response.total_pages
    })
  }

  const getGenres = (): Observable<Genre[]> => {
    return moviesService.getGenres()
  }

  const searchMovies = (query: string): Observable<Movie[]> => {
    return moviesService.searchMovies(query)
  }

  const updateMovies = (newMovies: Movie[]) => {
    movies.value = newMovies
  }

  return {
    movies,
    page,
    totalPages,
    loadMovies,
    getMovie,
    getGenres,
    fetchNextPage,
    searchMovies,
    updateMovies
  }
})

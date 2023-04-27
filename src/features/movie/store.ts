// store.ts
import type { Movie, PaginatedResponse } from './types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MoviesService } from './services/moviesService'
import type { Observable } from 'rxjs'
import { useGenreStore } from '../genre/store'

export const useMovieStore = defineStore('movies', () => {
  const moviesService = new MoviesService()

  const allMovies = ref<Movie[]>([])
  const page = ref(1)
  const totalPages = ref(0)

  const loadMovies = async () => {
    const genreStore = useGenreStore()
    if (allMovies.value?.length && allMovies.value.length > 0) {
      return
    }
    moviesService.getMovies(1, genreStore.selectedGenre).subscribe((response) => {
      allMovies.value = response.results
      page.value = response.page
      totalPages.value = response.total_pages
    })
  }

  const getMovie = (id: number): Observable<Movie | null> => {
    return moviesService.getMovie(id)
  }

  const fetchNextPage = async () => {
    const genreStore = useGenreStore()
    if (page.value === totalPages.value) {
      return
    }
    moviesService
      .getMovies(page.value + 1, genreStore.selectedGenre.value)
      .subscribe((response) => {
        allMovies.value = [...allMovies.value, ...response.results]
        page.value = response.page
        totalPages.value = response.total_pages
      })
  }

  const searchMovies = (query: string): Observable<PaginatedResponse<Movie[]>> => {
    return moviesService.searchMovies(query)
  }

  const updateMovies = (newMovies: Movie[]) => {
    allMovies.value = newMovies
  }

  const filteredMovies = computed(() => {
    const genreStore = useGenreStore()

    if (genreStore.selectedGenre.length === 0) {
      return allMovies.value
    }

    return allMovies.value.filter((movie) =>
      movie.genre_ids.some((id) => genreStore.selectedGenre.map((genre) => genre.id).includes(id))
    )
  })

  return {
    movies: filteredMovies,
    page,
    totalPages,
    loadMovies,
    getMovie,
    fetchNextPage,
    searchMovies,
    updateMovies
  }
})

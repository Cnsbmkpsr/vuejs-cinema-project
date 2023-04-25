// store.ts
import type { Movie } from './types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MoviesService } from './services/moviesService'

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

  return {
    movies,
    page,
    totalPages,
    loadMovies,
    fetchNextPage
  }
})

// src/features/movie/store.ts
import type { Movie } from './types'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { MoviesService } from './services/moviesService'
import { useInject } from '../../container.config'
import { useGenreStore } from '../genre/store'

export const useMovieStore = defineStore('movies', () => {
  const moviesService = useInject(MoviesService)
  const genreStore = useGenreStore()

  const searchQuery = ref<string>('')
  const movies = ref<Movie[]>([])
  const movieDetails = ref<Movie | null>(null)
  const page = ref(1)
  const totalPages = ref(0)

  const loadMovies = async () => {
    if (movies.value?.length && movies.value.length > 0) {
      return
    }
    const { page: resPage, results, total_pages } = await moviesService.getMovies({})

    movies.value = results
    page.value = resPage
    totalPages.value = total_pages
  }

  const getMovie = async (id: number) => {
    const movie = await moviesService.getMovie(id)
    movieDetails.value = movie
  }

  const setPage = async (newPage: number) => {
    const resMovies =
      searchQuery.value !== ''
        ? await moviesService.searchMovies({
            query: searchQuery.value,
            page: newPage
          })
        : await moviesService.getMovies({
            genres: genreStore.selectedGenres,
            page: newPage
          })

    movies.value = [...movies.value, ...resMovies.results]
    page.value = resMovies.page
    totalPages.value = resMovies.total_pages
  }

  const setSearchQuery = async (query: string) => {
    searchQuery.value = query

    const resMovies =
      query !== ''
        ? await moviesService.searchMovies({
            query
          })
        : await moviesService.getMovies({
            genres: genreStore.selectedGenres
          })

    movies.value = resMovies.results
    page.value = resMovies.page
    totalPages.value = resMovies.total_pages
  }

  watchEffect(async () => {
    const resMovies =
      searchQuery.value !== ''
        ? await moviesService.searchMovies({
            query: searchQuery.value
          })
        : await moviesService.getMovies({
            genres: genreStore.selectedGenres
          })

    movies.value = resMovies.results
    page.value = resMovies.page
    totalPages.value = resMovies.total_pages
  })

  return {
    movies,
    page,
    searchQuery,
    totalPages,
    loadMovies,
    getMovie,
    setPage,
    setSearchQuery
  }
})

import { ref } from 'vue'
import type { Movie } from './types'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])

  const addMovie = (movie: Movie) => {
    movies.value.push(movie)
  }

  const removeMovie = (id: number) => {
    movies.value = movies.value.filter((movie) => movie.id !== id)
  }

  const updateMovie = (movie: Movie) => {
    movies.value = movies.value.map((m) => (m.id === movie.id ? movie : m))
  }

  return {
    movies,
    addMovie,
    removeMovie,
    updateMovie
  }
})

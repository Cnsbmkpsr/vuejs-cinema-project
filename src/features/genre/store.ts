import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from './types'
import { MoviesService } from '../movie/services/moviesService'

export const useGenreStore = defineStore('genres', () => {
  const genres = ref<Genre[]>([])
  const selectedGenre = ref<Genre[]>([])
  const moviesService = new MoviesService()

  const loadGenres = async () => {
    genres.value = [
      'Action',
      'Adventure',
      'Animation',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'History'
    ]
    // TODO : load genres from the moviesService
  }

  const selectGenre = (genre: Genre) => {
    selectedGenre.value = [...selectedGenre.value, genre]
  }

  const unselectGenre = (genre: Genre) => {
    selectedGenre.value = selectedGenre.value.filter((g) => g !== genre)
  }

  const isSelected = (genre: Genre) => {
    return selectedGenre.value.includes(genre)
  }

  return { genres, loadGenres, selectGenre, unselectGenre, isSelected }
})

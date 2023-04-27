import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from './types'
import { useInject } from '../../container.config'
import { GenreService } from './services/genreService'

export const useGenreStore = defineStore('genres', () => {
  const genreService = useInject(GenreService)

  const genres = ref<Genre[]>([])
  const selectedGenres = ref<number[]>([])

  const loadGenres = async () => {
    const { genres: resGenres } = await genreService.getGenres()
    genres.value = resGenres
  }

  const selectGenre = (genre: Genre) => {
    selectedGenres.value = [...selectedGenres.value, genre.id]
  }

  const unselectGenre = (genre: Genre) => {
    selectedGenres.value = selectedGenres.value.filter((g) => g !== genre.id)
  }

  const isSelected = (genre: Genre) => {
    return selectedGenres.value.includes(genre.id)
  }

  return { genres, selectedGenres, loadGenres, selectGenre, unselectGenre, isSelected }
})

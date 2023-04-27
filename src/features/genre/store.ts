// src/features/genre/store.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from './types'
import { MoviesService } from '../movie/services/moviesService'
import type { Observable } from 'rxjs'

export const useGenreStore = defineStore('genres', () => {
  const genres = ref<Genre[]>([])
  const selectedGenre = ref<Genre[]>([])
  const moviesService = new MoviesService()

  const loadGenres = async () => {
    moviesService.getGenres().subscribe((response) => {
      genres.value = response.map((genre) => ({ id: genre.id, name: genre.name }))
    })
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

  const getGenres = (): Observable<Genre[]> => {
    return moviesService.getGenres()
  }

  return { genres, loadGenres, selectGenre, unselectGenre, isSelected, getGenres, selectedGenre }
})

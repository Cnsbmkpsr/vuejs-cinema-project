// src/views/HomeView.vue
<template>
  <TheHeader title="Movies">
    <template v-slot:search>
      <SearchInput @debounced-search="handleSearch($event.searchResults, $event.query)" />
    </template>
  </TheHeader>

  <div class="my-4">
    <GenresList />
  </div>
  <div class="grid grid-cols-2" ref="moviesListElement">
    <MovieListItem v-for="movie in movieStore.movies" :key="movie.id" :movie="movie" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MovieListItem from '../features/movie/components/MovieListItem.vue'
import { useMovieStore } from '../features/movie/store'
import TheHeader from '../components/TheHeader.vue'
import SearchInput from '../features/search/components/SearchInput.vue'
import { useGenreStore } from '../features/genre/store'
import GenresList from '../features/genre/components/GenresList.vue'
import type { Movie } from '@/features/movie/types'

const moviesListElement = ref<HTMLElement>()
const inputSearch = ref<HTMLInputElement>()

const movieStore = useMovieStore()
const genresStore = useGenreStore()

movieStore.loadMovies()
genresStore.loadGenres()

const handleSearch = async (searchResults: Movie[], query: string) => {
  if (query === '') {
    await movieStore.loadMovies()
  } else {
    movieStore.updateMovies(searchResults)
  }
}
</script>

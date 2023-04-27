// src/views/HomeView.vue
<template>
  <TheHeader title="Movies">
    <template v-slot:search>
      <SearchInput />
    </template>
  </TheHeader>

  <div class="my-4" v-if="!movieStore.searchQuery">
    <GenresList />
  </div>
  <div class="grid grid-cols-2" ref="moviesListElement">
    <MovieListItem v-for="movie in movieStore.movies" :key="movie.id" :movie="movie" />
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import MovieListItem from '../features/movie/components/MovieListItem.vue'
import { useMovieStore } from '../features/movie/store'
import TheHeader from '../components/TheHeader.vue'
import SearchInput from '../features/search/components/SearchInput.vue'
import { useGenreStore } from '../features/genre/store'
import GenresList from '../features/genre/components/GenresList.vue'
import { onScrollBottom$ } from '../features/movie/utils/onScrollBottom'

const moviesListElement = ref<HTMLElement>()

const movieStore = useMovieStore()
const genresStore = useGenreStore()

movieStore.loadMovies()
genresStore.loadGenres()

watchEffect(() => {
  if (!moviesListElement.value) return

  const scrollButtonSubscription = onScrollBottom$(moviesListElement.value).subscribe(() => {
    movieStore.setPage(movieStore.page + 1)
  })

  return () => {
    scrollButtonSubscription.unsubscribe()
  }
})
</script>

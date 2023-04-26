<template>
  <TheHeader title="Movies">
    <template v-slot:search>
      <SearchInput @debounced-search="handleSearch($event)" />
    </template>
  </TheHeader>
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

const moviesListElement = ref<HTMLElement>()
const inputSearch = ref<HTMLInputElement>()

const movieStore = useMovieStore()

movieStore.loadMovies()

const handleSearch = (value: string) => {
  // TODO : Implement search
  console.log(value)
}
</script>

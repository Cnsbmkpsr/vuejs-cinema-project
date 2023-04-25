<template>
  <h1 class="text-3xl">Movie List</h1>
  <div class="grid grid-cols-2" ref="moviesListElement">
    <MovieListItem v-for="movie in movieStore.movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import MovieListItem from '../features/movie/components/MovieListItem.vue'
import { useMovieStore } from '../features/movie/store'
import { onScrollBottom$ } from '../features/movie/utils/onScrollBottom'

const moviesListElement = ref<HTMLElement>()

const movieStore = useMovieStore()

movieStore.loadMovies()

watchEffect(() => {
  if (!moviesListElement.value) return

  const scrollButtonSubscription = onScrollBottom$(moviesListElement.value).subscribe(() => {
    movieStore.fetchNextPage()
  })

  return () => {
    scrollButtonSubscription.unsubscribe()
  }
})
</script>

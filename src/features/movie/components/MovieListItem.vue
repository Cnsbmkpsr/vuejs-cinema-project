<!-- MovieListItem.vue -->
<template>
  <div class="movie-list-item">
    <img :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" alt="Movie Poster" />
    <h2>{{ movie.title }}</h2>
    <p>Rating: {{ movie.vote_average }}</p>
    <p>Release Date: {{ movie.release_date }}</p>
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Movie } from '../types'

export default defineComponent({
  props: {
    movie: {
      type: Object as () => Movie,
      required: true
    }
  }
})
</script>

<style scoped>
.movie-list-item {
}
</style>

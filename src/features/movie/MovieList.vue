<!-- MovieList.vue -->
<template>
  <div>
    <h1>Movie List</h1>
    <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useMovieStore } from './store'
import MovieListItem from './components/MovieListItem.vue'

export default defineComponent({
  components: {
    MovieListItem
  },
  setup() {
    const movieStore = useMovieStore()
    const movies = ref<Movie[]>([])

    onMounted(() => {
      console.log('onMounted')
      movieStore.loadMovies()
    })

    console.log('initial movies value:', movies.value)

    watch(
      () => movieStore.movies,
      (newValue) => {
        console.log('movies updated:', newValue)
        movies.value = newValue
      }
    )

    return {
      movies
    }
  }
})
</script>

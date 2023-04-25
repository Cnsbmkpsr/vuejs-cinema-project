<!-- MovieList.vue -->
<template>
  <div>
    <h1>Movie List</h1>
    <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
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
      const subscription = movieStore.movies.subscribe((value) => {
        movies.value = value
      })

      // Unsubscribe from the movies BehaviorSubject when the component is unmounted
      return () => {
        subscription.unsubscribe()
      }
    })

    console.log('initial movies value:', movies.value)

    return {
      movies
    }
  }
})
</script>

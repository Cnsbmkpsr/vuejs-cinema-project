<template>
  <div v-if="movie">
    <h1>
      {{ movie.title }} <span v-if="movie.original_title">({{ movie.original_title }})</span>
    </h1>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster" />
    <p><strong>Overview:</strong> {{ movie.overview }}</p>
    <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
    <p><strong>Vote Average:</strong> {{ movie.vote_average }}/10</p>
    <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
    <p><strong>Popularity:</strong> {{ movie.popularity }}</p>
    <p v-if="movie.adult"><strong>Adult:</strong> Yes</p>
    <p v-else><strong>Adult:</strong> No</p>
    <p><strong>Genres:</strong> {{ genres.join(', ') }}</p>
  </div>
  <div v-else>
    <p>Loading movie details...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useMovieStore } from '../store'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'MovieDetails',
  setup() {
    const movieStore = useMovieStore()
    const router = useRouter()
    const route = useRoute()
    const movieId = parseInt(route.params.id as string)
    const movie = ref(null)

    onMounted(async () => {
      movie.value = await movieStore.getMovie(movieId).toPromise()
    })

    const genres = ref([])

    onMounted(async () => {
      if (movie.value) {
        const genreIds = movie.value.genre_ids
        const allGenres = await movieStore.getGenres().toPromise()
        genres.value = allGenres
          .filter((genre) => genreIds.includes(genre.id))
          .map((genre) => genre.name)
      }
    })

    return {
      movie,
      genres
    }
  }
})
</script>

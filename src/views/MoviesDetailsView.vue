<template>
  <div v-if="movieStore.movieDetails">
    <h1>
      {{ movieStore.movieDetails.title }}
      <span v-if="movieStore.movieDetails.original_title"
        >({{ movieStore.movieDetails.original_title }})</span
      >
    </h1>
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movieStore.movieDetails.poster_path"
      alt="Movie poster"
    />
    <p><strong>Overview:</strong> {{ movieStore.movieDetails.overview }}</p>
    <p><strong>Release Date:</strong> {{ movieStore.movieDetails.release_date }}</p>
    <p><strong>Vote Average:</strong> {{ movieStore.movieDetails.vote_average }}/10</p>
    <p><strong>Vote Count:</strong> {{ movieStore.movieDetails.vote_count }}</p>
    <p><strong>Popularity:</strong> {{ movieStore.movieDetails.popularity }}</p>
    <p v-if="movieStore.movieDetails.adult"><strong>Adult:</strong> Yes</p>
    <p v-else><strong>Adult:</strong> No</p>
    <p><strong>Genres:</strong> {{ movieGenres.map((genre) => genre.name).join(', ') }}</p>
  </div>
  <div v-else>
    <p>Loading movie details...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGenreStore } from '../features/genre/store'
import { useMovieStore } from '../features/movie/store'
import type { Genre } from '../features/movie/types'

const movieStore = useMovieStore()
const genreStore = useGenreStore()

const route = useRoute()

const movieId = parseInt(route.params.id as string)
const movieGenres = ref<Genre[]>([])

onMounted(async () => {
  await movieStore.getMovie(movieId)
})

onMounted(async () => {
  if (movieStore.movieDetails) {
    const genreIds = movieStore.movieDetails?.genre_ids
    movieGenres.value = genreStore.genres.filter((genre) => genreIds.includes(genre.id))
  }
})
</script>

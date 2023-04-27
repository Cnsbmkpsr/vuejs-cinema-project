<!-- MovieListItem.vue -->
<template>
  <div
    class="col-span-2 scale-100 py-16 sm:mx-auto sm:max-w-xl md:scale-100 lg:col-span-1 lg:scale-90 xl:scale-100"
  >
    <div
      class="flex max-h-80 space-x-8 border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:cursor-pointer hover:shadow-2xl sm:rounded-3xl"
    >
      <div class="h-48 w-1/2 overflow-visible">
        <img
          class="rounded-3xl shadow-lg"
          :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path"
          alt="Movie Poster"
        />
      </div>
      <div class="flex w-1/2 flex-col space-y-4">
        <div class="flex items-start justify-between">
          <h2 class="text-3xl font-bold">{{ movie.title }}</h2>
          <div class="rounded-xl bg-yellow-400 p-2 font-bold">{{ movie.vote_average }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-400">{{ movie.media_type }}</div>
          <div class="text-lg text-gray-800">
            {{ movie.release_date?.substring(0, 4) }}
          </div>
        </div>
        <p class="max-h-40 overflow-y-hidden text-gray-400">
          {{ movie.overview }}
        </p>
      </div>
    </div>
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

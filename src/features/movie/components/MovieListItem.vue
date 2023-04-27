<template>
  <div
    class="py-16 col-span-2 lg:col-span-1 xl:scale-100 lg:scale-90 md:scale-100 scale-100 sm:max-w-xl sm:mx-auto"
  >
    <div
      class="bg-white transition-all duration-300 shadow-lg hover:shadow-2xl hover:cursor-pointer border-gray-100 max-h-80 border sm:rounded-3xl p-8 flex space-x-8"
    >
      <div class="h-48 overflow-visible w-1/2">
        <img
          class="rounded-3xl shadow-lg"
          :src="
            movie.poster_path
              ? 'https://image.tmdb.org/t/p/w300/' + movie.poster_path
              : '/path/to/default-image.jpg'
          "
          alt="Movie Poster"
        />
      </div>
      <div class="flex flex-col w-1/2 space-y-4">
        <div class="flex justify-between items-start">
          <h2 class="text-3xl font-bold">{{ movie.title }}</h2>
          <div class="bg-yellow-400 font-bold rounded-xl p-2">{{ movie.vote_average }}</div>
        </div>
        <div class="flex flex-col w-1/2 space-y-4">
          <div>
            <div class="text-sm text-gray-400">{{ movie.media_type }}</div>
            <div class="text-lg text-gray-800">
              {{ movie.release_date ? movie.release_date.substring(0, 4) : '' }}
            </div>
          </div>
        </div>
        <p class="text-gray-400 max-h-40 overflow-y-hidden">
          {{ movie.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { Movie } from '../types'

export default defineComponent({
  props: {
    movie: {
      type: Object as () => Movie,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const goToMovieDetails = () => {
      router.push({ name: 'MovieDetails', params: { id: props.movie.id } })
    }

    return {
      goToMovieDetails
    }
  }
})
</script>

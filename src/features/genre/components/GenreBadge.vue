<template>
  <div
    @click="handleToggleGenre()"
    :class="[
      'flex shrink-0 items-center gap-1 rounded-full border-2 py-1 pl-2 pr-1.5 text-xl text-gray-950 hover:cursor-pointer lg:gap-2 lg:border-[3px] lg:py-1 lg:pl-2.5 lg:pr-2 lg:text-2xl',
      props.isSelected ? 'border-white bg-white' : 'border-black bg-transparent-full'
    ]"
  >
    {{ genre.name }}
    <img
      :src="props.isSelected ? '/imgs/close-badge-icon.svg' : '/imgs/add-badge-icon.svg'"
      class="h-5 w-5 lg:h-6 lg:w-6"
      alt="Badge action icon"
    />
  </div>
</template>

<script setup lang="ts">
import { useGenreStore } from '../store'
import type { Genre } from '../types'

const props = defineProps<{
  genre: Genre
  isSelected: boolean
}>()

const genreStore = useGenreStore()

const handleToggleGenre = () => {
  if (props.isSelected) {
    genreStore.unselectGenre(props.genre)
  } else {
    genreStore.selectGenre(props.genre)
  }
}
</script>

<style scoped></style>

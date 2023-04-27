<template>
  <div
    @click="handleToggleGenre()"
    :class="[
      'rounded-full text-gray-950 flex items-center border-[3px] shrink-0 text-2xl pr-2 pl-2.5 py-1 gap-2 hover:cursor-pointer',
      props.isSelected ? 'bg-white border-white' : 'bg-transparent-full border-black'
    ]"
  >
    {{ props.title }}
    <img
      :src="props.isSelected ? '/imgs/close-badge-icon.svg' : '/imgs/add-badge-icon.svg'"
      class="h-6 w-6"
      alt="Badge action icon"
    />
  </div>
</template>

<script setup lang="ts">
import { useGenreStore } from '../store'

const props = defineProps<{
  title: string
  isSelected: boolean
}>()

const genreStore = useGenreStore()

const handleToggleGenre = () => {
  if (props.isSelected) {
    genreStore.unselectGenre(props.title)
  } else {
    genreStore.selectGenre(props.title)
  }
}
</script>

<style scoped></style>

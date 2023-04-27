<template>
  <div class="flex gap-2 overflow-x-auto pb-0.5">
    <GenreBadge
      v-for="genre in genresStore.genres"
      :key="genre.id"
      :genre="genre"
      :isSelected="genresStore.isSelected(genre)"
    />
  </div>
</template>

<script setup lang="ts">
import { useGenreStore } from '../store'
import GenreBadge from './GenreBadge.vue'

const genresStore = useGenreStore()
</script>

<style scoped></style>

<template>
  <button
    class="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-transparent-dark-200 h-9 px-3 text-white"
    @click="handleToggleSortBy()"
  >
    <svg
      :class="filterStore.order === 'desc' ? 'h-3.5' : 'h-3.5 rotate-180'"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 1V15M5 1L9 5M5 1L1 5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useFilterStore } from '../store'

const filterStore = useFilterStore()

const handleToggleSortBy = () => {
  filterStore.toggleOrder()
}
</script>

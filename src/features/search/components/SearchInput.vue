// src/features/search/components/SearchInput.vue
<template>
  <div
    class="flex w-full items-center gap-2 overflow-hidden rounded-2xl border-[3px] border-gray-950 p-2.5 lg:w-auto lg:rounded-[24px] lg:border-4 lg:p-4"
  >
    <input
      type="text"
      name="search"
      class="flex-1 text-xl outline-none placeholder:text-gray-800 lg:text-2xl"
      placeholder="Search..."
      ref="inputRef"
    />
    <img src="/imgs/search-icon.svg" alt="search" class="h-8 w-8" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMovieStore } from '../../movie/store'
import { inputDebounce$ } from '../utils/inputDebounce'

const inputRef = ref<HTMLInputElement>()
const movieStore = useMovieStore()

watchEffect(() => {
  if (!inputRef.value) return

  const inputRefSubscription = inputDebounce$(inputRef.value).subscribe((value) => {
    movieStore.setSearchQuery(value)
  })

  return () => {
    inputRefSubscription.unsubscribe()
  }
})
</script>

<style scoped></style>

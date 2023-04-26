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
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs'
import { ref, watchEffect } from 'vue'
import { useMovieStore } from '../../movie/store'

const emit = defineEmits(['debouncedSearch'])

const inputRef = ref<HTMLInputElement>()
const movieStore = useMovieStore()

watchEffect(() => {
  if (!inputRef.value) return

  const inputObservable = fromEvent(inputRef.value, 'input').pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    filter((value: string) => value.length >= 3 || value.length === 0),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((value: string) => movieStore.searchMovies(value)),
    tap((results) => {
      emit('debouncedSearch', results)
    })
  )

  const subscription = inputObservable.subscribe()

  return () => {
    subscription.unsubscribe()
  }
})
</script>

<style scoped></style>

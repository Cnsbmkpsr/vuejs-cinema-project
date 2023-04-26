<template>
  <div class="border-gray-950 border-4 rounded-[24px] p-4 gap-2 flex items-center overflow-hidden">
    <input
      type="text"
      name="search"
      class="text-2xl placeholder:text-gray-800 outline-none"
      placeholder="Search..."
      ref="inputRef"
    />
    <img src="/imgs/search-icon.svg" alt="search" class="w-8 h-8" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { inputDebounce$ } from '../utils/inputDebounce'

const emit = defineEmits(['debouncedSearch'])

const inputRef = ref<HTMLInputElement>()

watchEffect(() => {
  if (!inputRef.value) return

  const inputRefSubscription = inputDebounce$(inputRef.value).subscribe((value) => {
    emit('debouncedSearch', value)
  })

  return () => {
    inputRefSubscription.unsubscribe()
  }
})
</script>

<style scoped></style>

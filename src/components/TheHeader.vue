<template>
  <div
    class="flex w-full flex-col items-center justify-between gap-4 rounded-none bg-white px-8 py-8 lg:flex-row lg:gap-0 lg:rounded-[48px] lg:px-12 lg:py-10"
  >
    <h1 class="text-5xl lg:text-7xl">{{ props.title }}</h1>
    <slot name="search" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<style scoped></style>

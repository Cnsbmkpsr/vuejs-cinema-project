<template>
  <div class="bg-white rounded-[48px] w-full px-12 py-10 flex justify-between">
    <h1 class="text-7xl">{{ props.title }}</h1>
    <div class="">
      <slot name="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<style scoped></style>

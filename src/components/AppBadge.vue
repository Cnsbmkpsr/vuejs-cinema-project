<template>
  <span
    class="inline-block whitespace-nowrap rounded-sm bg-transparent-dark-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs leading-none text-white"
    >{{ props.title }}</span
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<style scoped></style>

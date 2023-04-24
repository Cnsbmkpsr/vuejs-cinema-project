<template>
  <div class="flex flex-col gap-0.5">
    <TaskCard v-for="task in taskStore.completedTasks" :key="task.id" :task="task" />
  </div>
</template>

<script setup lang="ts">
import TaskCard from '../features/movie/components/TaskCard.vue'
import { useTaskStore } from '../features/movie/store'

const taskStore = useTaskStore()
</script>

<style scoped></style>

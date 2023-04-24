<template>
  <div class="flex flex-col gap-0.5">
    <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '../features/sort/store'
import TaskCard from '../features/movie/components/TaskCard.vue'
import { useTaskStore } from '../features/movie/store'
import { sortTasksBy } from '../features/movie/utils/sortTasksBy

const filterStore = useFilterStore()
const taskStore = useTaskStore()

const filteredTasks = computed(() => {
  if (!taskStore.uncompletedTasks?.length) return []
  return sortTasksBy(taskStore.uncompletedTasks, filterStore.filter, filterStore.order)
})
</script>

<style scoped></style>

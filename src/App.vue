<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@/assets/main.css'
import { provide } from 'vue'
import { setupContainer } from './container.config'

provide('container', setupContainer())
</script>

<style>
body {
  background-color: #e0e7ff;
}

#app {
  max-width: 1280px;
  width: 95%;
  margin: auto;
}

@media (max-width: 1024px) {
  #app {
    width: 100%;
  }
}
</style>

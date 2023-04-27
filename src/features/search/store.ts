// src/features/search/store.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Filters, Order } from './types'

export const useFilterStore = defineStore('filters', () => {
  const searchQuery = ref('')
  const filter = ref<Filters>('title')
  const order = ref<Order>('asc')

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setFilter = (newFilter: Filters) => {
    filter.value = newFilter
  }

  const toggleOrder = () => {
    order.value = order.value === 'asc' ? 'desc' : 'asc'
  }

  return { searchQuery, setSearchQuery, filter, order, setFilter, toggleOrder }
})

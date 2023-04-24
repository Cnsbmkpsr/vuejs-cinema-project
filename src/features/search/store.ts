import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Filters, Order } from './types'

export const useFilterStore = defineStore('filters', () => {
  const filter = ref<Filters>('title')
  const order = ref<Order>('asc')

  const setFilter = (newFilter: Filters) => {
    filter.value = newFilter
  }

  const toggleOrder = () => {
    order.value = order.value === 'asc' ? 'desc' : 'asc'
  }

  return { filter, order, setFilter, toggleOrder }
})

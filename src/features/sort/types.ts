import type { Movie } from '../movie/types'

export type Filters = keyof Movie
export type Order = 'asc' | 'desc'

import type { Filters, Order } from '../../sort/types'
import type { Movie } from '../types'

export const sortMoviesBy = (movies: Movie[], sortBy: Filters, orderBy: Order): Movie[] => {
  return movies.sort((a, b) => {
    let comparison = 0

    if (a[sortBy]! < b[sortBy]!) {
      comparison = -1
    }
    if (a[sortBy]! > b[sortBy]!) {
      comparison = 1
    }
    return orderBy === 'desc' ? comparison * -1 : comparison
  })
}

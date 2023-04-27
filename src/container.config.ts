import 'reflect-metadata'
import { Container, type interfaces } from 'inversify'
import { ApiService } from './services/apiService'
import { MoviesService } from './features/movie/services/moviesService'
import { inject } from 'vue'
import { GenreService } from './features/genre/services/genreService'

export function useInject<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const container = inject<Container>('container')
  if (!container) {
    throw new Error('React ContainerContext has not been initialized')
  }
  return container.get<T>(identifier)
}

export const setupContainer = () => {
  const container = new Container()
  container.bind<ApiService>(ApiService).toSelf().inRequestScope()
  container.bind<MoviesService>(MoviesService).toSelf().inRequestScope()
  container.bind<GenreService>(GenreService).toSelf().inRequestScope()
  return container
}

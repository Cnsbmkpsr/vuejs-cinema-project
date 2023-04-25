import { fromEvent, debounceTime, filter } from 'rxjs'

/**
 * @param element - The element to listen to
 * @param offset - The offset from the bottom of the element to trigger the event
 * @returns An observable that emits when the user scrolls to the bottom of the element
 */
export const onScrollBottom$ = (element: HTMLElement) => {
  return fromEvent(window, 'scroll').pipe(
    debounceTime(100),
    filter(() => {
      const scrollPositionMiddleScreen = window.scrollY + window.innerHeight
      const elementBottom = element.clientHeight + element.clientTop - window.innerHeight
      return scrollPositionMiddleScreen > elementBottom
    })
  )
}

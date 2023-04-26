import { Observable, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs'

export const inputDebounce$ = (element: HTMLInputElement): Observable<string> => {
  return fromEvent(element, 'input').pipe(
    debounceTime(333),
    map((event: any) => event.target.value),
    distinctUntilChanged()
  )
}

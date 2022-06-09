import { ReplaySubject, filter, map } from 'rxjs'
class EventBus {
  constructor() {
    this.subject$ = new ReplaySubject()
  }
  emit(event) {
    this.subject$.next(event)
  }
  on(eventName, action) {
    return this.subject$.pipe(
      filter(e => e.name === eventName),
      map((e) => e.data)
    ).subscribe(action)
  }
}

export default EventBus

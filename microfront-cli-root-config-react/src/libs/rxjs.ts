import { ReplaySubject, filter, map } from 'rxjs'
class EventBus {
  subject$: ReplaySubject<string>
  constructor() {
    this.subject$ = new ReplaySubject<string>()
  }
  emit(event: any) {
    this.subject$.next(event)
  }
  on(eventName: string, action: any) {
    return this.subject$.pipe(
      filter((e: any) => e.name === eventName),
      map((e) => e.data)
    ).subscribe(action)
  }
}

export default EventBus

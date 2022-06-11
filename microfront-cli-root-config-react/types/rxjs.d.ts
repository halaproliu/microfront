interface EventObject {
  name: string,
  data: any
}

declare class EventBus {
  constructor()
  subject$: ReplaySubject

  emit(event: EventObject)
  on(eventName: string, action: any)
} 
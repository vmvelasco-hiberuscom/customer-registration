import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationMessage {
  type: 'success' | 'error';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messageState = new BehaviorSubject<NotificationMessage | null>(null);

  readonly message$ = this.messageState.asObservable();

  success(message: string): void {
    this.messageState.next({ type: 'success', message });
  }

  error(message: string): void {
    this.messageState.next({ type: 'error', message });
  }

  clear(): void {
    this.messageState.next(null);
  }
}

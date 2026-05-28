import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly pendingRequests = new BehaviorSubject<number>(0);
  private readonly loadingState = new BehaviorSubject<boolean>(false);

  readonly loading$ = this.loadingState.asObservable();

  show(): void {
    const nextCount = this.pendingRequests.value + 1;
    this.pendingRequests.next(nextCount);
    this.loadingState.next(nextCount > 0);
  }

  hide(): void {
    const nextCount = Math.max(0, this.pendingRequests.value - 1);
    this.pendingRequests.next(nextCount);
    this.loadingState.next(nextCount > 0);
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from '../../../core/services/loading.service';
import { NotificationMessage, NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {
  showSuccessModal = false;
  successEmail = '';
  readonly loading$: Observable<boolean>;
  readonly notification$: Observable<NotificationMessage | null>;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly notificationService: NotificationService
  ) {
    this.loading$ = this.loadingService.loading$;
    this.notification$ = this.notificationService.message$;
  }

  onRegistered(email: string): void {
    this.successEmail = email;
    this.showSuccessModal = true;
    this.notificationService.success('Account created successfully. You can now log in.');
  }

  onRegisterFailed(message: string): void {
    this.notificationService.error(message);
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  dismissNotification(): void {
    this.notificationService.clear();
  }
}

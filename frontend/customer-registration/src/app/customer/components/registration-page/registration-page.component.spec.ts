import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RegistrationPageComponent } from './registration-page.component';
import { LoadingService } from '../../../core/services/loading.service';
import { NotificationService } from '../../../core/services/notification.service';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    notificationService = jasmine.createSpyObj<NotificationService>('NotificationService', ['success', 'error', 'clear'], {
      message$: of(null),
    });

    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      providers: [
        { provide: LoadingService, useValue: { loading$: of(false) } },
        { provide: NotificationService, useValue: notificationService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows success modal and notification when registered', () => {
    component.onRegistered('user@example.com');

    expect(component.showSuccessModal).toBeTrue();
    expect(component.successEmail).toBe('user@example.com');
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('sends error notifications when registration fails', () => {
    component.onRegisterFailed('Failed message');
    expect(notificationService.error).toHaveBeenCalledWith('Failed message');
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { ValidationSummaryComponent } from './components/validation-summary/validation-summary.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRegistrationComponent } from './components/product-registration/product-registration.component';
import { EnvioListComponent } from './components/envio-list/envio-list.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    CustomerListComponent,
    RegistrationPageComponent,
    RegistrationFormComponent,
    SuccessModalComponent,
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    ProductListComponent,
    ProductRegistrationComponent,
    EnvioListComponent,
    ClienteListComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [HomeComponent, CustomerListComponent, RegistrationPageComponent, ProductListComponent, ProductRegistrationComponent, EnvioListComponent, ClienteListComponent],
})
export class CustomerModule {}

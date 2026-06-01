import { Routes } from '@angular/router';
import { HomeComponent } from './customer/components/home/home.component';
import { RegistrationPageComponent } from './customer/components/registration-page/registration-page.component';
import { CustomerListComponent } from './customer/components/customer-list/customer-list.component';
import { EnvioListComponent } from './customer/components/envio-list/envio-list.component';
import { IncidenciasComponent } from './customer/components/incidencias/incidencias.component';
import { ProductListComponent } from './customer/components/product-list/product-list.component';
import { ProductRegistrationComponent } from './customer/components/product-registration/product-registration.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product-registration', component: ProductRegistrationComponent },
  { path: 'envios', component: EnvioListComponent },
  { path: 'incidencias', component: IncidenciasComponent },
];

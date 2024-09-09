import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';

export const routes: Routes = [
    { path: '', redirectTo: '/patient', pathMatch: 'full' },
  { path: 'patient', component: PatientComponent }
];

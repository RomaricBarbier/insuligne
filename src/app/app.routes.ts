import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { DiabeteTypeComponent } from './diabete-type/diabete-type.component';

export const routes: Routes = [
    { path: '', redirectTo: '/patient', pathMatch: 'full' },
  { path: 'patient', component: PatientComponent }
];

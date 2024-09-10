import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SuiviComponent } from './suivi/suivi.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

export const routes: Routes = [
  { path: '', redirectTo: 'authentification', pathMatch: 'full'  },
  { path: 'patient', component: PatientComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'suivi', component: SuiviComponent }
];

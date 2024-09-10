import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './patient/patient.component'; // Import du composant patient
import { AuthentificationComponent } from './authentification/authentification.component'; // Import du composant authentification
import { GlycemieComponent } from './glycemie/glycemie.component';
import { PoidComponent } from './poid/poid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent, AuthentificationComponent, GlycemieComponent, PoidComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

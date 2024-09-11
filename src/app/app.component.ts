import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './patient/patient.component'; // Import du composant patient
import { DiabeteTypeComponent } from './diabete-type/diabete-type.component';
import { AuthentificationComponent } from './authentification/authentification.component'; // Import du composant authentification
import { GlycemieComponent } from './glycemie/glycemie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoidComponent } from "./poid/poid.component";
import { SymptomFormComponent } from './symptome/symptome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent, ReactiveFormsModule, DiabeteTypeComponent, AuthentificationComponent, GlycemieComponent, PoidComponent, SymptomFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})

export class AppComponent {

}

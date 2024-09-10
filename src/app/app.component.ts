import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './patient/patient.component'; // Import du composant patient
import { FormsModule } from '@angular/forms';
import { DiabeteTypeComponent } from './diabete-type/diabete-type.component';
import { AuthentificationComponent } from './authentification/authentification.component'; // Import du composant authentification
import { GlycemieComponent } from './glycemie/glycemie.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent, FormsModule, DiabeteTypeComponent, AuthentificationComponent, GlycemieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})

export class AppComponent {

}

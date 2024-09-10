import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './patient/patient.component'; // Import du composant patient
import { GlycemieComponent } from './glycemie/glycemie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent, GlycemieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

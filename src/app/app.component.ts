import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './patient/patient.component'; // Import du composant patient
import { FormsModule } from '@angular/forms';
import { DiabeteTypeComponent } from './diabete-type/diabete-type.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent, FormsModule, DiabeteTypeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})

export class AppComponent {

}

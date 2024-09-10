import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';


@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  patient: any; //Variable pour stocker les donnée du patient

  constructor(private fhirService: FhirService) { }

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() : void {
    const url = 'api/patient';
    const id = '87d745c65dge6540127987i2';

    // Appel du service pour récupérer le patient
    this.fhirService.get(url, id).subscribe({
      next: (data) => {
        this.patient = data; //On stock le résultat dans la variable patient
        console.log('Patient data:', this.patient);
      },
      error: (error) => {
        console.error('Error fetching patient:', error);
      },
      complete: () => {
        console.log('Patient data fetched successfully');
      }
    });
  }
}
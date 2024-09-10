import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';
import { AuthentificationService} from './authentification.service';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  patients: any[] = []; // Variable pour stocker la liste des patients

  constructor(private fhirService: FhirService, private authentificationService: AuthentificationService) {}

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getPatients(); // Appel de la méthode pour récupérer les patients au chargement
  }

  getPatients(): void {
    const url = 'api/patient';

    // Appel au service pour récupérer la liste des patients
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.patients = data;
        console.log('Liste des patients:', this.patients); // Afficher dans la console la liste récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des patients:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des patients terminée');
      }
    });
  }

    // Méthode pour sélectionner un patient
    selectPatient(patientId: string): void {
      this.authentificationService.setSelectedPatientId(patientId)
      console.log('Selected patient ID:', patientId);
    }
}

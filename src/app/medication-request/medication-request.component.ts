import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-medication-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication-request.component.html',
  styleUrl: './medication-request.component.css'
})
export class MedicationRequestComponent implements OnInit {
  medicationRequests: any[] = []; // Variable pour stocker la liste des observations
  selectedPatientId: string | null = null; //ID du patient

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getCarePlans(); // Appel de la méthode pour récupérer les patients au chargement
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
  }

  getCarePlans(): void {
    const url = 'api/medication-request';

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.medicationRequests = data;
        console.log('Liste des medication-request:', this.medicationRequests); // Afficher dans la console la liste récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des medication-request:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des medication-request terminée');
      }
    });
  }

}

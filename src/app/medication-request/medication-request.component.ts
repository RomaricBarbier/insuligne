import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-medication-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication-request.component.html',
  styleUrls: ['./medication-request.component.css']
})
export class MedicationRequestComponent implements OnInit {
  medicationRequests: any[] = []; // Variable pour stocker la liste des demandes de médicaments
  selectedPatientId: string | null = null; // ID du patient
  filtredMedicationRequest: any = null; // Dernière demande de médicament pour le patient sélectionné

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  // À l'initialisation de l'appli
  ngOnInit(): void {
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
    this.getMedicationRequests(); // Appel de la méthode pour récupérer les demandes de médicaments au chargement
  }

  getMedicationRequests(): void {
    const url = 'api/medication-request';

    // Appel au service pour récupérer la liste des demandes de médicaments
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.medicationRequests = data;
        console.log('Liste des medication-requests:', this.medicationRequests); // Afficher dans la console la liste récupérée

        // Filtrer les demandes de médicaments sur l'id du patient
        this.filtredMedicationRequest = this.medicationRequests.filter(medicationRequest =>
          medicationRequest.subject?.reference === `Patient/${this.selectedPatientId}`
        );
        console.log('medication-requests filtré:', this.filtredMedicationRequest); // Afficher dans la console la liste filtrée

        

      },
      error: (error) => {
        console.error('Erreur lors de la récupération des medication-requests:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des medication-requests terminée');
      }
    });
  }
}

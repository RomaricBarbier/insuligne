import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FhirService } from '../fhir.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-observation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.css'
})
export class ObservationComponent implements OnInit {
  observations: any[] = []; // Variable pour stocker la liste des demandes de médicaments
  selectedPatientId: string | null = null; // ID du patient
  filtredObservations: any = null; // Dernière demande de médicament pour le patient sélectionné

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  // À l'initialisation de l'appli
  ngOnInit(): void {
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
    this.getObservations(); // Appel de la méthode pour récupérer les demandes de médicaments au chargement
  }

  getObservations(): void {
    const url = 'api/observation';

    // Appel au service pour récupérer la liste des demandes de médicaments
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.observations = data;
        console.log('Liste des observation médecin:', this.observations); // Afficher dans la console la liste récupérée

        // Filtrer les demandes de médicaments sur l'id du patient
        this.filtredObservations = this.observations.filter(observation =>
          observation.subject?.reference === `Patient/${this.selectedPatientId}` &&
          observation.code?.coding?.some((coding: { code: string; }) => coding.code === 'code4u')
        );
        console.log('observation médecin filtré:', this.filtredObservations); // Afficher dans la console la liste filtrée

      },
      error: (error) => {
        console.error('Erreur lors de la récupération des observations médecin:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des observation médecin');
      }
    });
  }

}

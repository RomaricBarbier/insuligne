import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-graph-glycemie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-glycemie.component.html',
  styleUrl: './graph-glycemie.component.css'
})
export class GraphGlycemieComponent implements OnInit {
  observations: any[] = []; // Variable pour stocker la liste des observations
  filteredObservations: any[] = []; // Observations filtrées pour le patient
  selectedPatientId: string | null = null; //ID du patient

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  ngOnInit(): void {
    // Récupérer l'ID du patient sélectionné
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
    
    // Appel pour récupérer les observations
    this.getObservations(); 
  }

  getObservations(): void {
    const url = 'api/observation';

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.observations = data;
        console.log('Liste des observations:', this.observations); // Afficher toutes les observations

        // Filtrer les observations en fonction de l'ID du patient et du code de glycémie
        this.filteredObservations = this.observations.filter(observation =>
          observation.subject?.reference === `Patient/${this.selectedPatientId}` &&
          observation.code?.coding?.some((coding: { code: string; }) => coding.code === '15074-8') // Filtre par code FHIR pour la glycémie
        );

        console.log('Observations filtrées (Glycémie):', this.filteredObservations);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des observations:', error);
      },
      complete: () => {
        console.log('Récupération des observations terminée');
      }
    });
  }
}
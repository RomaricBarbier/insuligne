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
  selectedPatientId: string | null = null; //ID du patient

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getObservations(); // Appel de la méthode pour récupérer les patients au chargement
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
  }

  getObservations(): void {
    const url = 'api/observation';

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.observations = data;
        console.log('Liste des observations:', this.observations); // Afficher dans la console la liste récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des patients:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des patients terminée');
      }
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';

@Component({
  selector: 'app-graph-glycemie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-glycemie.component.html',
  styleUrl: './graph-glycemie.component.css'
})
export class GraphGlycemieComponent {
  observations: any[] = []; // Variable pour stocker la liste des observations

  constructor(private fhirService: FhirService) {}

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getObservations(); // Appel de la méthode pour récupérer les patients au chargement
  }

  getObservations(): void {
    const url = 'api/observation';

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.observations = data;
        console.log('Liste des patients:', this.observations); // Afficher dans la console la liste récupérée
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

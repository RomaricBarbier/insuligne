import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-care-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './care-plan.component.html',
  styleUrl: './care-plan.component.css'
})
export class CarePlanComponent implements OnInit {
  carePlans: any[] = []; // Variable pour stocker la liste des observations
  selectedPatientId: string | null = null; //ID du patient
  filteredCarePlan: any[] = []; //Care_plan filtré

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getCarePlans(); // Appel de la méthode pour récupérer les patients au chargement
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
  }

  getCarePlans(): void {
    const url = 'api/care-plan';

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.carePlans = data;
        console.log('Liste des care-plans:', this.carePlans); // Afficher dans la console la liste récupérée
      
        //Filtrer les care-plan sur l'id du patient
        this.filteredCarePlan = this.carePlans.filter(carePlan =>
          carePlan.subject?.reference === `Patient/${this.selectedPatientId}` // Filtre par code FHIR pour la glycémie
        );

        // Trier les observations par date décroissante
        this.filteredCarePlan.sort((a, b) => new Date(b.effectiveDateTime).getTime() - new Date(a.effectiveDateTime).getTime());

        // Limiter à 5 dernières observations
        this.filteredCarePlan = this.filteredCarePlan.slice(0, 1);

        console.log('Dernier care-plan :', this.filteredCarePlan);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des care-plans:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des care-plans terminée');
      }
    });
  }

}

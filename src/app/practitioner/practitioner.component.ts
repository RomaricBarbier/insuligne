import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhirService } from '../fhir.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.css'
})
export class PractitionerComponent implements OnInit {
  praticiens: any[] = []; // Variable pour stocker la liste des observations
  selectedPatientId: string | null = null; //ID du patient

  constructor(private fhirService: FhirService, private idPatientAuthentification: AuthentificationService) {}

  //A l'initialisation de l'appli
  ngOnInit(): void {
    this.getPraticiens(); // Appel de la méthode pour récupérer les patients au chargement
    this.selectedPatientId = this.idPatientAuthentification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);
  }

  getPraticiens(): void {
    const url = 'api/practitioner';

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.praticiens = data;
        console.log('Liste des praticiens:', this.praticiens); // Afficher dans la console la liste récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des patients:', error);
      },
      complete: () => {
        console.log('Récupération de la liste des praticiens terminée');
      }
    });
  }

}

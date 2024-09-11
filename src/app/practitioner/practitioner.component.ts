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
  practitioner: any;
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
    const id = '1235dr4u54321'

    // Appel au service pour récupérer la liste des observations
    this.fhirService.get(url, id).subscribe({
      next: (data) => {
        this.practitioner = data;
        console.log('Practitioner:', this.practitioner); // Afficher dans la console la liste récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du practitioner:', error);
      },
      complete: () => {
        console.log('Récupération du pratitioner terminée');
      }
    });
  }

}

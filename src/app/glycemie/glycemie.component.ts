import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import du HttpClient
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-glycemie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Ajout de ReactiveFormsModule pour les formulaires réactifs et CommonModule
  templateUrl: './glycemie.component.html',
  styleUrls: ['./glycemie.component.css']
})
export class GlycemieComponent implements OnInit {
  glycemiaForm!: FormGroup;
  selectedPatientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private idPatientAuthentrification: AuthentificationService
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec le champ glycemia et la validation pour accepter seulement des chiffres
    this.glycemiaForm = this.fb.group({
      glycemia: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // Validation: accepter seulement des chiffres
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.selectedPatientId = this.idPatientAuthentrification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);

    if (!this.selectedPatientId) {
      console.error('Patient ID is missing');
      return;
    }

    if (this.glycemiaForm.valid) {
      const glycemiaValue = this.glycemiaForm.value.glycemia;

      // Construire la requête POST pour créer une nouvelle observation (glycémie)
      const url = `https://fhir.alliance4u.io/api/observation`; // URL correcte pour une requête POST
      const body = {
        resourceType: 'Observation',
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8', // Code LOINC pour la mesure de glucose dans le sang
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: `Patient/${this.selectedPatientId}` // Passer l'ID du patient ici
        },
        valueQuantity: {
          value: parseFloat(glycemiaValue), // Assurez-vous que c'est un nombre
          unit: 'mmol/L',
          system: 'http://unitsofmeasure.org',
          code: 'mmol/L'
        },
        effectiveDateTime: new Date().toISOString() // Date actuelle pour l'observation
      };

      console.log('Request body:', body); // Afficher le contenu de la requête

      // Envoyer la requête POST à l'API pour créer la nouvelle observation
      this.http.post(url, body).pipe(
        catchError(error => {
          console.error("Erreur lors de l'enregistrement de la glycémie", error);
          return throwError(error);
        })
      ).subscribe(() => {
        console.log('Quantité de glucose dans le sang enregistrée avec succès');
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}

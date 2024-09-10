import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import du HttpClient
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-glycemie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Ajout de ReactiveFormsModule pour les formulaires réactifs et CommonModule
  templateUrl: './glycemie.component.html',
  styleUrls: ['./glycemie.component.css']
})
export class GlycemieComponent implements OnInit {
  glycemiaForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {} // Injection de HttpClient

  ngOnInit(): void {
    // Initialiser le formulaire avec le champ glycemia et la validation pour accepter seulement des chiffres
    this.glycemiaForm = this.fb.group({
      glycemia: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // Validation: accepter seulement des chiffres
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.glycemiaForm.valid) {
      const glycemiaValue = this.glycemiaForm.value.glycemia;

      // Récupérer l'ID du patient (à adapter selon votre implémentation)
      const patientId = '87d745c65dge6540127987i2';

      // Construire la requête PUT pour mettre à jour la ressource Observation (glycémie)
      const url = `https://fhir.alliance4u.io/observation?patient=${patientId}`;
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
          reference: `Patient/${patientId}`
        },
        valueQuantity: {
          value: glycemiaValue,
          unit: 'mmol/L',
          system: 'http://unitsofmeasure.org',
          code: 'mmol/L'
        },
        effectiveDateTime: new Date().toISOString() // Date actuelle pour l'observation
      };

      // Envoyer la requête PUT à l'API
      this.http.put(url, body).pipe(
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

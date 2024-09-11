import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-poids',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './poid.component.html',
  styleUrls: ['./poid.component.css']
})
export class PoidComponent implements OnInit {
  weightForm!: FormGroup;
  selectedPatientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private idPatientAuthentrification: AuthentificationService
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire pour le poids avec une validation pour accepter uniquement des chiffres
    this.weightForm = this.fb.group({
      weight: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  // Méthode appelée lors de la soumission du formulaire de poids
  public onWeightSubmit(): void {
    this.selectedPatientId = this.idPatientAuthentrification.getSelectedPatientId();
    console.log('Selected patient ID for weight:', this.selectedPatientId);

    if (this.weightForm.valid && this.selectedPatientId) {
      const weightValue = this.weightForm.value.weight;

      // Construire la requête POST pour créer une nouvelle observation de poids
      const weightUrl = `https://fhir.alliance4u.io/api/observation`;
      const weightBody = {
        resourceType: 'Observation',
        status: 'final',
        category: [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                code: 'vital-signs',
                display: 'Vital Signs'
              }
            ],
            text: 'Vital Signs'
          }
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '29463-7',
              display: 'Body weight'
            }
          ],
          text: 'Body weight'
        },
        subject: {
          reference: `Patient/${this.selectedPatientId}`
        },
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/observation-deviceCode',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '469204003',
                  display: 'Floor scale, electronic'
                }
              ]
            }
          },
          {
            url: 'http://hl7.org/fhir/us/vitals/StructureDefinition/AssociatedSituationExt',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '248160001',
                  display: 'Undressed'
                }
              ]
            }
          }
        ],
        effectiveDateTime: new Date().toISOString(),
        valueQuantity: {
          value: parseFloat(weightValue),
          unit: 'kg',
          system: 'http://unitsofmeasure.org',
          code: 'kg'
        }
      };

      this.http.post(weightUrl, weightBody).pipe(
        catchError(error => {
          console.error("Erreur lors de l'enregistrement du poids", error);
          return throwError(error);
        })
      ).subscribe(() => {
        console.log('Poids enregistré avec succès');
      });
    } else {
      console.log('Formulaire de poids invalide');
    }
  }
}

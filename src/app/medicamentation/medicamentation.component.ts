import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-medicamentation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './medicamentation.component.html',
  styleUrls: ['./medicamentation.component.css']
})
export class MedicamentationComponent implements OnInit {
  medicationForm!: FormGroup;
  selectedPatientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authentificationService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.medicationForm = this.fb.group({
      medication: [''],
    });
  }

  onSubmit() {
    this.selectedPatientId = this.authentificationService.getSelectedPatientId();
    if (!this.selectedPatientId) {
      console.error('Patient ID is missing');
      return;
    }

    if (this.medicationForm.valid) {
      const medicationValue = this.medicationForm.value.medication;

      const url = 'https://fhir.alliance4u.io/api/diagnostic-report';
      const body = {
        resourceType: 'DiagnosticReport',
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '1234-5', // Code LOINC pour le rapport de médicament, ou autre code approprié
              display: 'Medication Report'
            }
          ],
          text: 'Medication Report'
        },
        subject: {
          reference: `Patient/${this.selectedPatientId}`
        },
        effectiveDateTime: new Date().toISOString(),
        issued: new Date().toISOString(),
        result: [
          {
            reference: 'Observation/medication', // Assurez-vous que cette observation existe
            display: `Medication: ${medicationValue}`
          }
        ],
        conclusion: `Medication: ${medicationValue}`
      };

      console.log('Request body:', body);

      this.http.post(url, body).pipe(
        catchError(error => {
          console.error("Erreur lors de l'enregistrement du DiagnosticReport", error);
          return throwError(error);
        })
      ).subscribe({
        next: () => {
          console.log('DiagnosticReport enregistré avec succès');
        },
        error: (error) => {
          console.error("Erreur lors de l'enregistrement du DiagnosticReport", error);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}

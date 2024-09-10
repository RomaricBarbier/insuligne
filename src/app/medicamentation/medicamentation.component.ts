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
      medication: ['', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
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
      const startDateValue = new Date(this.medicationForm.value.startDate).toISOString();
      const endDateValue = new Date(this.medicationForm.value.endDate).toISOString();

      const url = `https://fhir.alliance4u.io/api/medication-statement`;
      const body = {
        resourceType: 'MedicationStatement',
        status: 'active',
        medicationCodeableConcept: {
          text: medicationValue
        },
        subject: {
          reference: `Patient/${this.selectedPatientId}`
        },
        effectivePeriod: {
          start: startDateValue,
          end: endDateValue
        },
        dateAsserted: new Date().toISOString(),
        note: [
          {
            text: `Prescription for ${medicationValue}`
          }
        ]
      };

      console.log('Request body:', body);

      this.http.post(url, body).pipe(
        catchError(error => {
          console.error("Erreur lors de l'enregistrement du médicament", error);
          return throwError(error);
        })
      ).subscribe(() => {
        console.log('Médicament enregistré avec succès');
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}

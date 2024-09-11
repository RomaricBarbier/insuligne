import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FhirService } from '../fhir.service';
import { catchError, throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-symptome-form',
  standalone: true,
  templateUrl: './symptome.component.html',
  styleUrls: ['./symptome.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SymptomFormComponent implements OnInit {
  symptomForm!: FormGroup;
  selectedPatientId: string | null = null;
  symptomSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private fhirService: FhirService,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec validation
    this.symptomForm = this.fb.group({
      symptom: ['', Validators.required], // Champ pour le symptôme, obligatoire
      comments: ['']  // Commentaires facultatifs
    });

    // Récupération de l'ID du patient via le service d'authentification
    this.selectedPatientId = this.authService.getSelectedPatientId();
    console.log('Patient ID sélectionné:', this.selectedPatientId);
  }

  // Fonction pour soumettre le formulaire et créer un DiagnosticReport avec un symptôme
  submitSymptom(): void {
    if (this.symptomForm.invalid || !this.selectedPatientId) {
      console.warn('Le formulaire est invalide ou aucun patient sélectionné.');
      return;
    }

    const formValues = this.symptomForm.value;

    const body = {
      resourceType: 'DiagnosticReport',
      status: 'final',
      code: {
        coding: [{
          system: 'http://hl7.org/fhir/sid/icd-10',
          code: 'R68.89',  // Code générique pour "Autres symptômes généraux"
          display: formValues.symptom
        }],
        text: formValues.symptom
      },
      subject: {
        reference: `Patient/${this.selectedPatientId}`
      },
      conclusion: formValues.symptom,  // Le symptôme comme conclusion
      issued: new Date().toISOString(),
      performer: [{
        reference: 'Practitioner/1234',
        display: 'Dr. Example'
      }],
      notes: [{
        text: formValues.comments
      }]
    };

    // Appel POST au service FHIR pour créer le DiagnosticReport
    this.fhirService.post('api/diagnostic-report', body).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du DiagnosticReport', error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log('DiagnosticReport pour symptôme créé avec succès !', response);
      this.symptomSubmitted = true;  // Indique que le symptôme a été soumis
    });
  }
}

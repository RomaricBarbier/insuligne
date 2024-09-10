import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FhirService } from '../fhir.service';
import { catchError, of } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diabete-type',
  standalone: true,
  templateUrl: './diabete-type.component.html',
  styleUrls: ['./diabete-type.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class DiabeteTypeComponent implements OnInit {
  diabeteTypeForm!: FormGroup;
  selectedPatientId: string | null = null;
  diagnosticReportExists: boolean = false; // Variable pour savoir si un DiagnosticReport existe déjà
  diabetesTypes : any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private fhirService: FhirService,
    private idPatientAuthentrification: AuthentificationService
  ) {}

  ngOnInit() {
    // Initialisation du formulaire
    this.diabeteTypeForm = this.fb.group({
      diabeteType: ['type1'] // Valeur par défaut : 'type1'
    });

    // Obtenez l'ID du patient
    this.selectedPatientId = this.idPatientAuthentrification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);

    this.getDiabetesTypes();
  }

  getDiabetesTypes() : void {
    const url = 'api/diagnostic-report';

    // Appel du service pour récupérer les diagnostics
    this.fhirService.get(url).subscribe({
      next: (data) => {
        this.diabetesTypes = data; // On stocke le résultat dans la variable diabetesTypes
        console.log('Diabetes types data:', this.diabetesTypes);
      },
      error: (error) => {
        console.error('Error fetching diabetes types:', error);
      },
      complete: () => {
        console.log('Diabetes types data fetched successfully');
        this.checkDiagnosticReportExists(); // Vérifier si le diagnostic existe après avoir récupéré les données
      }
    });
  }

  checkDiagnosticReportExists(): void {
    // Vérifier si l'ID du patient est présent dans les diagnostics
    if (this.selectedPatientId) {
      this.diagnosticReportExists = this.diabetesTypes.some(diagnostic =>
        diagnostic.subject?.reference === `Patient/${this.selectedPatientId}`
      );
    } else {
      this.diagnosticReportExists = false;
    }
    console.log('Diagnostic report exists:', this.diagnosticReportExists);
  }

  // Fonction pour soumettre le type de diabète
  enregistrerType() {
    if (this.diagnosticReportExists) {
      console.warn('Un DiagnosticReport existe déjà, soumission désactivée.');
      return;
    }

    const codeFhir = this.diabeteTypeForm.value.diabeteType === 'type1' ? 'E10' : 'E11';
    const body = {
      resourceType: 'DiagnosticReport',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://hl7.org/fhir/sid/icd-10',
            code: codeFhir,
            display: this.diabeteTypeForm.value.diabeteType === 'type1' ? 'Diabetes mellitus type 1' : 'Diabetes mellitus type 2'
          }
        ],
        text: this.diabeteTypeForm.value.diabeteType === 'type1' ? 'Type 1 Diabetes' : 'Type 2 Diabetes'
      },
      subject: {
        reference: `Patient/${this.selectedPatientId}`
      },
      conclusion: this.diabeteTypeForm.value.diabeteType,
      issued: new Date().toISOString(),
      performer: [
        {
          reference: 'Practitioner/1234',
          display: 'Dr. Example'
        }
      ]
    };

    // Envoyer la requête POST pour enregistrer le rapport diagnostique
    this.fhirService.post('api/diagnostic-report', body).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du DiagnosticReport.', error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log('DiagnosticReport créé avec succès !', response);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FhirService } from '../fhir.service';
import { catchError, of } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-diabete-type',
  standalone: true,
  templateUrl: './diabete-type.component.html',
  styleUrls: ['./diabete-type.component.css'],
  imports: [ReactiveFormsModule] // Assurez-vous que ReactiveFormsModule est importé
})
export class DiabeteTypeComponent implements OnInit {
  diabeteTypeForm!: FormGroup;
  selectedPatientId: string | null = null;
  diagnosticReportExists: boolean = false; // Variable pour savoir si un DiagnosticReport existe déjà

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

    // Vérifiez s'il existe déjà un DiagnosticReport pour ce patient
    this.checkExistingDiagnosticReport();
  }

  // Fonction pour vérifier si un DiagnosticReport existe déjà pour ce patient
  checkExistingDiagnosticReport() {
    if (!this.selectedPatientId) {
      console.error('Patient ID is missing');
      return;
    }

    // Construisez l'URL pour récupérer les DiagnosticReports en filtrant par le patient
    const url = `api/diagnostic-report/${this.selectedPatientId}`;

    // Envoyer la requête GET pour récupérer les rapports diagnostiques du patient
    this.fhirService.get(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la vérification du DiagnosticReport.', error);
        return of(null); // Retourner null en cas d'erreur
      })
    ).subscribe((response: any) => {
      if (response && response.entry && response.entry.length > 0) {
        // Analyser chaque DiagnosticReport dans la réponse
        const reports = response.entry;
        const reportForPatient = reports.some((entry: any) => {
          return entry.resource.subject.reference === `Patient/${this.selectedPatientId}`;
        });

        if (reportForPatient) {
          this.diagnosticReportExists = true;
          console.log('DiagnosticReport already exists for this patient.');
        } else {
          this.diagnosticReportExists = false;
          console.log('No DiagnosticReport found for this patient.');
        }
      } else {
        this.diagnosticReportExists = false;
        console.log('No DiagnosticReport found for this patient.');
      }
    });
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FhirService } from '../fhir.service';
import { catchError } from 'rxjs/operators';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private fhirService: FhirService,
    private idPatientAuthentrification: AuthentificationService
  ) {}

  ngOnInit() {
    this.diabeteTypeForm = this.fb.group({
      diabeteType: ['type1'] // Valeur par défaut : 'type1'
    });
  }

  enregistrerType() {
    const patientId = '87d745c65dge6540127987i2';
    const codeFhir = this.diabeteTypeForm.value.diabeteType === 'type1' ? 'E10' : 'E11';
    this.selectedPatientId = this.idPatientAuthentrification.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);

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

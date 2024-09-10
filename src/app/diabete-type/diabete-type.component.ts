import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FhirService } from '../fhir.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-diabete-type',
  standalone: true,
  template: `
    <form>
      <div>
        <input type="radio" id="type1" formControlName="diabeteType" value="type1">
        <label for="type1">Type 1</label>
      </div>
      <div>
        <input type="radio" id="type2" formControlName="diabeteType" value="type2">
        <label for="type2">Type 2</label>
      </div>
      <button (click)="enregistrerType()">Enregistrer</button>
    </form>
  `
})
export class DiabeteTypeComponent implements OnInit {
  diabeteTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private fhirService: FhirService
  ) {}

  ngOnInit() {
    this.diabeteTypeForm = this.fb.group({
      diabeteType: ['type2'] // Valeur par défaut : 'type2'
    });
  }

  enregistrerType() {
    const patientId = '87d745c65dge6540127987i2';
    const codeFhir = this.diabeteTypeForm.value.diabeteType === 'type1' ? 'E10' : 'E11';

    this.fhirService.post("api/diagnostic-report", {
      resourceType: 'diagnostic-report',
      subject: {
        reference: `patient/${patientId}`
      },
      conclusion: this.diabeteTypeForm.value.diabeteType,
      code: {
        coding: [
          {
            system: 'http://hl7.org/fhir/sid/icd-10',
            code: codeFhir
          }
        ]
      }
    }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du DiagnosticReport.', error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log('DiagnosticReport créé avec succès !', response);
    });
  }
}
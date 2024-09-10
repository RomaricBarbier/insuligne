import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FhirService } from '../fhir.service';
import { fhirclient } from 'fhirclient/lib/types';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-diabete-type',
  standalone: true,
  template: `
    <div>
      <input type="radio" id="type1" name="diabeteType" value="type1">
      <label for="type1">Type 1</label>
    </div>
    <div>
      <input type="radio" id="type2" name="diabeteType" value="type2">
      <label for="type2">Type 2</label>
    </div>
    <button (click)="enregistrerType(this)">Enregistrer</button>
  `
})
export class DiabeteTypeComponent {
  selectedType: string = ''; // Variable pour stocker le type sélectionné

  constructor(private http: HttpClient, private FHIRServices : FhirService ) {
    
  }

  enregistrerType(diabetetype : DiabeteTypeComponent) {
    diabeteType : DiabeteTypeComponent;
    // Récupérer l'ID du patient
    const patientId = '87d745c65dge6540127987i2'; 

    // Déterminer le code FHIR en fonction du type sélectionné
    const codeFhir = this.selectedType === 'type1' ? 'E10' : 'E11';
    diabetetype.FHIRServices.post("api/DiagnosticReport/conclusion","type2");
    // Construire la requête PUT pour mettre à jour la ressource Condition


  }
  enregistrerTypeTEST() {
    const url = 'https://fhir.alliance4u.io/api/diagnostic-report';
    const headers = { 'Content-Type': 'application/json' };
    const patientId = '87d745c65dge6540127987i2'; 

    const data = {
      resourceType: 'diagnostic-report',
      subject: {
        reference: `patient/${patientId}`
      },
      conclusion: this.selectedType,
      code: {
        coding: [
          {
            system: 'http://hl7.org/fhir/sid/icd-10',
            code: this.selectedType === 'type2' ? 'E11' : 'E10'
          }
        ]
      }
    };
    this.http.post(url, data, { headers }).pipe(

      catchError( error => {
        console.error('Erreur lors de la création du DiagnosticReport.', error);
        // Gérez l'erreur de manière appropriée, par exemple en affichant un message à l'utilisateur
      }
    );
  }
}
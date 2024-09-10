import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-medicamentation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Ajout de ReactiveFormsModule pour les formulaires réactifs et CommonModule
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
    // Initialiser le formulaire avec le champ medication et la validation
    this.medicationForm = this.fb.group({
      medication: ['', [Validators.required]], // Nom du médicament requis
      startDate: ['', Validators.required], // Date de début requise
      endDate: ['', Validators.required] // Date de fin requise
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.selectedPatientId = this.authentificationService.getSelectedPatientId();
    console.log('Selected patient ID:', this.selectedPatientId);

    if (!this.selectedPatientId) {
      console.error('Patient ID is missing');
      return;
    }

    if (this.medicationForm.valid) {
      const medicationValue = this.medicationForm.value.medication;
      const startDateValue = this.medicationForm.value.startDate;
      const endDateValue = this.medicationForm.value.endDate;

      // Construire la requête POST pour créer un MedicationStatement
      const url = `https://fhir.alliance4u.io/api/MedicationStatement`; // URL de l'API pour MedicationStatement
      const body = {
        resourceType: 'MedicationStatement',
        status: 'active',
        medicationCodeableConcept: {
          text: medicationValue // Nom du médicament
        },
        subject: {
          reference: `Patient/${this.selectedPatientId}` // ID du patient sélectionné
        },
        effectivePeriod: {
          start: startDateValue, // Date de début
          end: endDateValue // Date de fin
        }
      };

      console.log('Request body:', body); // Afficher le contenu de la requête

      // Envoyer la requête POST à l'API pour créer un MedicationStatement
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
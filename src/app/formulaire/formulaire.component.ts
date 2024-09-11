import { Component, OnInit, ViewChild } from '@angular/core';
import { GlycemieComponent } from '../glycemie/glycemie.component';
import { PoidComponent } from '../poid/poid.component';
import { DiabeteTypeComponent } from '../diabete-type/diabete-type.component';
import { MedicamentationComponent } from '../medicamentation/medicamentation.component';
import { SymptomFormComponent } from '../symptome/symptome.component';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // <-- Import du Router

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [CommonModule, GlycemieComponent, PoidComponent, SymptomFormComponent, DiabeteTypeComponent, MedicamentationComponent, MedicamentationComponent],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent implements OnInit {
  @ViewChild(GlycemieComponent) glycemieComponent!: GlycemieComponent;
  @ViewChild(DiabeteTypeComponent) diabeteTypeComponent!: DiabeteTypeComponent;
  @ViewChild(PoidComponent) poidComponent!: PoidComponent;
  @ViewChild(SymptomFormComponent) symptomFormComponent!: SymptomFormComponent;
  @ViewChild(MedicamentationComponent) MedicamentationComponent!: MedicamentationComponent;

  showPopup: boolean = false; // Pour afficher le popup de validation

  // Injecter le Router
  constructor(private fb: FormBuilder, private router: Router) {}  // <-- Ajout de `Router` ici

  ngOnInit(): void {}

  submitAllForms(): void {
    if (this.glycemieComponent.glycemiaForm.valid &&
        this.diabeteTypeComponent.diabeteTypeForm.valid &&
        this.poidComponent.weightForm.valid &&
        this.symptomFormComponent.symptomForm.valid &&
        this.MedicamentationComponent.medicationForm.valid) {

      // Soumettre les sous-formulaires
      this.glycemieComponent.onSubmit();
      this.diabeteTypeComponent.enregistrerType();
      this.poidComponent.onWeightSubmit();
      this.symptomFormComponent.submitSymptom();
      this.MedicamentationComponent.onSubmit();

      // Afficher le popup de validation pendant 5 secondes
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
        // Rediriger vers la page d'accueil avec l'ID du patient dans le state
        this.router.navigate(['/accueil'], { state: { patientId: this.MedicamentationComponent.selectedPatientId } });
      }, 5000);
    } else {
      console.log('Un ou plusieurs formulaires sont invalides.');
    }
  }
}

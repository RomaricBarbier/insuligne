import { Component, OnInit, ViewChild } from '@angular/core';
import { GlycemieComponent } from '../glycemie/glycemie.component';
import { PoidComponent } from '../poid/poid.component';
import { DiabeteTypeComponent } from '../diabete-type/diabete-type.component';
import { MedicamentationComponent } from '../medicamentation/medicamentation.component';
import { SymptomFormComponent } from '../symptome/symptome.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [CommonModule, GlycemieComponent, PoidComponent, SymptomFormComponent, DiabeteTypeComponent],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent implements OnInit {
  @ViewChild(GlycemieComponent) glycemieComponent!: GlycemieComponent;
  @ViewChild(DiabeteTypeComponent) diabeteTypeComponent!: DiabeteTypeComponent;
  @ViewChild(PoidComponent) poidComponent!: PoidComponent;
  @ViewChild(SymptomFormComponent) symptomFormComponent!: SymptomFormComponent;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submitAllForms(): void {
    if (this.glycemieComponent.glycemiaForm.valid &&
        this.diabeteTypeComponent.diabeteTypeForm.valid &&
        this.poidComponent.weightForm.valid &&
        this.symptomFormComponent.symptomForm.valid) {
      
      // Appeler les méthodes de soumission de chaque composant enfant
      this.glycemieComponent.onSubmit();
      this.diabeteTypeComponent.enregistrerType();
      this.poidComponent.onWeightSubmit();
      this.symptomFormComponent.submitSymptom();

    } else {
      console.log('Un ou plusieurs formulaires sont invalides.');
    }
  }
}

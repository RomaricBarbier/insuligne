import { Component } from '@angular/core';
import { GlycemieComponent } from '../glycemie/glycemie.component';
import { PoidComponent } from '../poid/poid.component';
import { DiabeteTypeComponent } from '../diabete-type/diabete-type.component';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [GlycemieComponent, PoidComponent, DiabeteTypeComponent],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

}

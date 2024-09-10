import { Component } from '@angular/core';
import { GlycemieComponent } from '../glycemie/glycemie.component';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [GlycemieComponent],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

}

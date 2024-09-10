import { Component } from '@angular/core';
import { GraphGlycemieComponent } from '../graph-glycemie/graph-glycemie.component';

@Component({
  selector: 'app-suivi',
  standalone: true,
  imports: [GraphGlycemieComponent],
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css'
})
export class SuiviComponent {

}

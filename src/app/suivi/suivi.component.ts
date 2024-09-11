import { Component } from '@angular/core';
import { GraphGlycemieComponent } from '../graph-glycemie/graph-glycemie.component';
import { PractitionerComponent } from '../practitioner/practitioner.component';

@Component({
  selector: 'app-suivi',
  standalone: true,
  imports: [GraphGlycemieComponent, PractitionerComponent],
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css'
})
export class SuiviComponent {

}

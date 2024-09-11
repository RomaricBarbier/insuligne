import { Component } from '@angular/core';
import { GraphGlycemieComponent } from '../graph-glycemie/graph-glycemie.component';
import { PractitionerComponent } from '../practitioner/practitioner.component';
import { CarePlanComponent } from '../care-plan/care-plan.component';

@Component({
  selector: 'app-suivi',
  standalone: true,
  imports: [GraphGlycemieComponent, PractitionerComponent, CarePlanComponent],
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css'
})
export class SuiviComponent {

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  constructor(private router: Router) {}

  goToFormulaire(): void {
    this.router.navigate(['/formulaire']);
  }

  goToSuivi(): void {
    this.router.navigate(['/suivi']);
  }
}


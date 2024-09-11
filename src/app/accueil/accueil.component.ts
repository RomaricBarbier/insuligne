import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  constructor(private router: Router) {}

  // Méthode pour naviguer vers le formulaire
  goToFormulaire(): void {
    this.router.navigate(['/formulaire']);
  }

  // Méthode pour naviguer vers la page de suivi
  goToSuivi(): void {
    this.router.navigate(['/suivi']);
  }
}

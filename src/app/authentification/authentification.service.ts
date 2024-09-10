import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private selectedPatientId: string | null = null;

  // Méthode pour définir l'ID du patient sélectionné
  setSelectedPatientId(patientId: string): void {
    this.selectedPatientId = patientId;
  }

  // Méthode pour obtenir l'ID du patient sélectionné
  getSelectedPatientId(): string | null {
    return this.selectedPatientId;
  }
}

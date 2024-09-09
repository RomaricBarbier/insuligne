import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  private baseUrl = 'https://fhir.alliance4u.io/'; 

  constructor(private http: HttpClient) { }

  // Méthode générique pour effectuer des requêtes GET
  get(resourceType: string, id?: string): Observable<any> {
    const url = id ? `${this.baseUrl}${resourceType}/${id}` : `${this.baseUrl}${resourceType}`;
    return this.http.get(url);
  }

  // Méthode générique pour effectuer des requêtes POST (création de ressources)
  post(resourceType: string, resource: any): Observable<any> {
    const url = `${this.baseUrl}${resourceType}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/fhir+json' 
      })
    };
    return this.http.post(url, resource, httpOptions);
  }

  // Méthode générique pour effectuer des requêtes PUT (mise à jour complète de ressources)
  put(resourceType: string, id: string, resource: any): Observable<any> {
    const url = `${this.baseUrl}${resourceType}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/fhir+json' 
      })
    };
    return this.http.put(url, resource, httpOptions);
  }

  // Méthode générique pour effectuer des requêtes PATCH (mise à jour partielle de ressources)
  patch(resourceType: string, id: string, resource: any): Observable<any> {
    const url = `${this.baseUrl}${resourceType}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/fhir+json',
        'Prefer': 'return=representation' // Demander au serveur de renvoyer la ressource mise à jour
      })
    };
    return this.http.patch(url, resource, httpOptions);
  }

  // Méthode générique pour effectuer des requêtes DELETE
  delete(resourceType: string, id: string): Observable<any> {
    const url = `${this.baseUrl}${resourceType}/${id}`;
    return this.http.delete(url);
  }

  // Autres méthodes spécifiques à FHIR peuvent être ajoutées ici si nécessaire (search, etc.)
}
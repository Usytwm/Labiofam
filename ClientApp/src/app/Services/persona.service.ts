import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private appUrl: String = environment.endpoint;
  private ApiUrl: String = 'api/Persona/';

  constructor(private _http: HttpClient) {}
  getPerson(): Observable<Usuario[]> {
    return this._http.get<Usuario[]>(`${this.appUrl}${this.ApiUrl}`);
  }

  getPersona(id: Number): Observable<Usuario> {
    return this._http.get<Usuario>(`${this.appUrl}${this.ApiUrl}${id}`);
  }

  deletePerson(id: Number): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.ApiUrl}${id}`);
  }

  addperson(person: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(`${this.appUrl}${this.ApiUrl}`, person);
  }
}

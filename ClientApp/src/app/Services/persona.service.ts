import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User as Usuario } from '../Interfaces/User';

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

  getPersona(id: string): Observable<Usuario> {
    return this._http.get<Usuario>(`${this.appUrl}${this.ApiUrl}${id}`);
  }

  deletePerson(id: string): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.ApiUrl}${id}`);
  }

  addperson(person: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(`${this.appUrl}${this.ApiUrl}`, person);
  }

  updateperson(id: string, persona: Usuario): Observable<void> {
    return this._http.put<void>(`${this.appUrl}${this.ApiUrl}${id}`, persona);
  }
}

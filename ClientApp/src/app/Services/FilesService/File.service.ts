import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseUrl: string = environment.endpoint;
  private apiUrl: string = 'api/File';
  constructor(private _http: HttpClient) {}

  getPhotoUrl(photoName: string): string {
    return `${this.baseUrl}${this.apiUrl}/${photoName}`;
  }

  uploadPhoto(photo: File): Observable<string> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this._http.post(`${this.baseUrl}${this.apiUrl}`, formData, {
      responseType: 'text',
    });
  }

  getPhoto(photoName: string): Observable<Blob> {
    return this._http.get(`${this.getPhotoUrl(photoName)}`, {
      responseType: 'blob',
    });
  }
}

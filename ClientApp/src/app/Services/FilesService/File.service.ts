import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseUrl: string = environment.endpoint;
  private apiUrl: string = 'api/Image';
  constructor(private _http: HttpClient) {}

  getPhotoUrl(fileName: string): string {
    return `${this.baseUrl}${this.apiUrl}/${fileName}`;
  }

  uploadPhoto(photo: File): Observable<string> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this._http.post(`${this.baseUrl}${this.apiUrl}`, formData, {
      responseType: 'text',
    });
  }

  getPhoto(fileName: string): Observable<Blob> {
    return this._http
      .get<Blob>(`${this.getPhotoUrl(fileName)}`, {
        responseType: 'blob' as 'json',
      })
      .pipe(
        catchError((error) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            console.log(JSON.parse(e.target.result));
          };
          reader.readAsText(error.error);
          return throwError(error);
        })
      );
  }
}

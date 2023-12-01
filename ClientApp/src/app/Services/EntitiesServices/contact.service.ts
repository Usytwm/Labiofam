import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../../Interfaces/Contact';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';
import { Observable, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends EntityAbstractService<Contact> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Contact/';
  }

  uploadPhoto(fotoBase64: string, id: string, filename: string): Observable<Contact | null> {
    const formData = new FormData();
    formData.append('foto', fotoBase64);
    formData.append('id', id);
    formData.append('filename', filename);

    return this._http.post(`${this.appUrl}/assets/upload`, formData).pipe(
      map((response: any) => response.Contact as Contact),
      catchError((err) => {
        Swal.fire('Error!', err.error.mensaje, 'error');
        return of(null); // Replace throwError with of(null)
      })
    );
  }

}

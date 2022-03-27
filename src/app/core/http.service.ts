import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(path: string, valParams?: any): Observable<any> {
    let params = {
      params: valParams || null,
    };
    return this.http.get(path, params).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}

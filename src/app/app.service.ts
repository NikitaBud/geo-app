import { HttpService } from './core/http.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private url: string =
    'https://api.geoapify.com/v1/geocode/autocomplete?text=';

  private apiKey: string = 'b398e865975b40df86a7510314de6d00';
  constructor(private http: HttpService) {}

  handleError(err: HttpErrorResponse): Observable<any> {
    if (err instanceof TimeoutError) {
      console.error(`Frontend returned timeout error: ${err['error']}`);
      return throwError(err['error']);
    }
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
      let errorText = err.error
        ? err.error.comment
          ? err.error.comment
          : err.error
        : null;
    }
    throw throwError(err);
  }

  getLocation(requestString: string): Observable<any> {
    return this.http
      .get(
        this.url +
          `${encodeURIComponent(requestString)}&format=json&limit=5&apiKey=${
            this.apiKey
          }`
      )
      .pipe(
        map((r) => r),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err);
        })
      );
  }
}

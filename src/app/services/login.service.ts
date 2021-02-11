import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public httpApi: HttpClient
  ) { }

    /**
   * Function used to authentificate users in the application
   * @param email The email of the user
   * @param password The password of the user
   */
  login(email: string, password: string): Observable<boolean> {
    return this.httpApi.post('https://reqres.in/api/login', {
      email,
      password
    }).pipe(
      tap((response: any) => localStorage.setItem('token', response?.token)), // Used for is-signed-in guard
      map((response: any) => !!response?.token),
      catchError(() => of(false))
    );
  }
}

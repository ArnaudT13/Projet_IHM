import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  /**
   * Retrieve the list of users
   */
  getUserList() {
    return this.httpApi.get('https://reqres.in/api/users?page=1').pipe(
      map((response: any) => response?.data)
    );
  }

  /**
   * Retrieve the details of a specific user
   * @param id The id of the user
   */
  getUserDetail(id: number): Observable<any> {
    return this.httpApi.get(`https://reqres.in/api/users/${id}`).pipe(
      map((response: any) => response?.data)
    );
  }

}

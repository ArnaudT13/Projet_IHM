import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userListSubject = new Subject<User[]>();
  userList = [];

  constructor(
    public httpApi: HttpClient
  ) { }

  /**
   * Retrieve the user list subject
   */
  getUserList() {
    this.httpApi.get<User[]>('https://reqres.in/api/users?page=1')
        .subscribe(
            (response: any) => {
              this.userList = response?.data;
              this.emitUserListSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
        );
  }

  /**
   * Emit user list for home page
   */
  emitUserListSubject(){
    this.userListSubject.next(this.userList.slice());
  }

  /**
   * Retrieve the details of a specific user
   * @param id The id of the user
   */
  getUserDetail(id: number): Observable<User> {
    return this.httpApi.get(`https://reqres.in/api/users/${id}`).pipe(
      map((response: any) => response?.data)
    );
  }

}

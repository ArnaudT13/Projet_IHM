import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  /**
   * Insert a user in the application
   * @param name The name of the user
   * @param job The job of the user
   */
  insertUser(name: string, job: string): Promise<boolean> {
    // Create post header
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = { headers: headers };

    // Create post body
    let postData = {   
      "name": name,
      "job": job
    }

    return new Promise(resolve => {
        this.httpApi.post("https://reqres.in/api/users", postData, requestOptions)
        .subscribe(
          () => {
            this.getUserList();
            resolve(true);
        }, error => {
          resolve(false);
          console.log(error);
      });
    });
  }

}

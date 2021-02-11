import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // User list of the page
  //userList$: User[];

  constructor(
    public router: Router,
    public userService: UserService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userService.getUserList();
    /*
    this.userService.userListSubject.subscribe(
        (users : User[])=>{
          this.userList$ = users;
        }
    );
    this.userService.emitUserListSubject();*/
  }

  /**
   * Select the user in the list
   * @param id The id of the selected user
   */
  async selectedUser(id: number) {
    await this.router.navigate(['user-details', id]);
  }

  /**
   * Logout from the application
   */
  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

}

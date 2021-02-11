import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
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
    public userService: UserService
  ) {}

  async selectedUser(id: number) {
    await this.router.navigate(['user-detail', id]);
  }

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
  

}

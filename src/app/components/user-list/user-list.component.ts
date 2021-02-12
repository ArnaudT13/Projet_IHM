import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {

  userList$ = [];
  userServiceSub = new Subscription();

  @Input()
  userId : number;

  @Output()
  selectedUser = new EventEmitter<number>();

  constructor(
    private userService : UserService
    ) { }

  ngOnInit() {
    this.userService.userListSubject.subscribe(
      (users : User[])=>{
        this.userList$ = users;
      });
    this.userService.emitUserListSubject();
  }
  
  ngOnDestroy() {
    this.userServiceSub.unsubscribe();
  }

}

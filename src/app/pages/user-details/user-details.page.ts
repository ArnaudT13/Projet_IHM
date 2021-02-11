import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  private selectedUserId: number;

  userDetail$: Observable<any>;

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedUserId = this.actRoute.snapshot.params.id;
    this.userDetail$ = this.userService.getUserDetail(this.selectedUserId);
  }


}

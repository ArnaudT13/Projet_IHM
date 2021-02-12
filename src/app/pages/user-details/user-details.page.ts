import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

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
    public utilsService: UtilsService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.selectedUserId = this.actRoute.snapshot.params.id;
    this.userDetail$ = this.userService.getUserDetail(this.selectedUserId);
  }

  /**
   * Function used to update user in the application
   */
  async updateUser(){
    await this.router.navigate(['update-user', this.selectedUserId]);
  }

  /**
   * Function used to delete user in the application
   */
  async deleteUser(){
    let responseDelete: Promise<boolean> = this.userService.deleteUser(this.selectedUserId);
    responseDelete.then((response) => {
      this.utilsService.manageSuccessErrorToast(this.toastCtrl, response, "User deleted", "User not deleted");
    });
    await this.router.navigateByUrl('home');
  }


}

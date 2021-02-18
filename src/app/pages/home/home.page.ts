import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(
    public router: Router,
    public userService: UserService,
    public utilsService: UtilsService,
    public loginService: LoginService,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.userService.getUserList();
  }

  /**
   * Logout from the application
   */
  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

  /**
   * Function used to insert user in the application
   */
  async insertUser(){
    await this.router.navigateByUrl('insert-user');
  }

  /**
   * Manage operations choice when the user is selected
   * @param id M
   */
  async presentActionSheet(id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'albums',
          text: 'Details',
          handler: () => {
            this.router.navigate(['user-details', id]);
          }
        },
        {
          icon: 'create',
          text: 'Update user',
          handler: () => {
            this.router.navigate(['update-user', id]);
          }
        },
        {
          icon:'trash',
          text: 'Delete user',
          role: 'destructive',
          handler: () => {
            let responseDelete: Promise<boolean> = this.userService.deleteUser(id);
            responseDelete.then((response) => {
              this.utilsService.manageSuccessErrorToast(this.toastCtrl, response, "User deleted", "User not deleted");
            });
          }
        },
        {
          icon: 'close',
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await actionSheet.present();
  }}

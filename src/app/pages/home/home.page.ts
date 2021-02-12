import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
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
    public loginService: LoginService,
    public actionSheetCtrl: ActionSheetController
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
  
  async updateUser(){
    await this.router.navigateByUrl('update-user');
  }

  /**
   * Manage operations choice when the user is selected
   * @param id M
   */
  async presentActionSheet(id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Details',
          handler: () => {
            this.router.navigate(['user-details', id]);
          }
        },
        {
          text: 'Update user',
          handler: () => {
            this.router.navigate(['update-user', id]);
          }
        },
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }}

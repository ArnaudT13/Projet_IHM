import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  login$: Subscription;

  constructor(
    public router: Router,
    public loginService: LoginService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
  }

  /**
   * Function used to authenticate the user in the application
   */
  signIn() {
    this.login$ = this.loginService.login(this.email, this.password).subscribe(
      async isLoggued => {
        if (isLoggued) {
          await this.router.navigateByUrl('home');
        }
        else{
          const alert = await this.alertCtrl.create({
            header: 'Authentication error',
            message: 'Incorrect email or password',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    );
  }

  /**
   * Register the user in the application
   */
  register(){
    this.router.navigateByUrl('register');
  }

  ngOnDestroy(): void {
    this.login$.unsubscribe();
  }
}

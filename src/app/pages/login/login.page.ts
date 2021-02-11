import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
    public userService: UserService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
  }

  signIn() {
    this.login$ = this.userService.login(this.email, this.password).subscribe(
      async isLoggued => {
        if (isLoggued) {
          await this.router.navigateByUrl('home');
        }
        else{
          const alert = await this.alertCtrl.create({
            header: 'Alert',
            message: 'Email ou mot de passe invalide',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.login$.unsubscribe();
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CustomValidator } from 'src/app/class/custom-validator';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private responseRegistration: Promise<boolean>;

  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public utilsService: UtilsService,
    public toastCtrl : ToastController,
    public router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }


  /**
   * Init the register form
   */
  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
       // check whether if password and confirm password match
       validators: CustomValidator.checkPasswords
    });
  }

  /**
   *  Function related to the register form button
   */
  onSubmitForm () {
    // Check form validity
    if (!this.registerForm.valid) {
      if(!this.registerForm.controls['email'].valid){
        this.utilsService.manageErrorToast(this.toastCtrl, "Email incorrect")
      }else if(!this.registerForm.controls['password'].valid){
        this.utilsService.manageErrorToast(this.toastCtrl, "Password incorrect")
      }else if(!this.registerForm.controls['confirmPassword'].valid){
        this.utilsService.manageErrorToast(this.toastCtrl, "Confirm Password incorrect")
      }else{
        this.utilsService.manageErrorToast(this.toastCtrl, "Password and Confirm Password don't match")
      }
    } else {
      // Retrieve form values
      const formValue = this.registerForm.value;

      // Use post service
      this.responseRegistration = this.userService.register(
        formValue['email'],
        formValue['password']);

      // Manage post response
      this.responseRegistration
        .then((response) => {
            this.utilsService.manageSuccessErrorToast(this.toastCtrl, response, "Registration accepted", "Registration not accepted");
            if(response){
              this.router.navigateByUrl('login');
            }
          })
    }
  }

}

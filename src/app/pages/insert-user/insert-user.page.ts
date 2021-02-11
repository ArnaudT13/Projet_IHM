import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.page.html',
  styleUrls: ['./insert-user.page.scss'],
})
export class InsertUserPage implements OnInit {

  userForm: FormGroup;

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
   * Init the insert form
   */
  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]]
    });
  }

  /**
   *  Function related to the insert form button
   */
  onSubmitForm () {
    if (!this.userForm.valid) {
      if(!this.userForm.controls['name'].valid){
        this.utilsService.manageErrorToast(this.toastCtrl, "Name incorrect")
      }else if(!this.userForm.controls['job'].valid){
        this.utilsService.manageErrorToast(this.toastCtrl, "Job incorrect")
      }
    } else {
      // Retrieve fom values
      const formValue = this.userForm.value;
      
      // Use post service
      let responseInsert: Promise<boolean> = this.userService.insertUser(
        formValue['name'],
        formValue['job']);

      // Manage post response
      responseInsert
        .then((response) => {
            this.utilsService.manageSuccessErrorToast(this.toastCtrl, response, "User added", "User not added");
          });
      this.router.navigateByUrl('home');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  private selectedUserId: number;

  userForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public utilsService: UtilsService,
    public toastCtrl : ToastController,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    this.selectedUserId = this.actRoute.snapshot.params.id;
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
      
      // Use put service
      let responseInsert: Promise<boolean> = this.userService.updateUser(
        this.selectedUserId,
        formValue['name'],
        formValue['job']);

      // Manage put response
      responseInsert
        .then((response) => {
            this.utilsService.manageSuccessErrorToast(this.toastCtrl, response, "User updated", "User not updated");
          });
      this.router.navigateByUrl('home');
    }
  }

}

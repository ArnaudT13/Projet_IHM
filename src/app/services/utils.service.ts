import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

    /**
   * Function used to display the toast of an operation sucess or error
   * @param toastCtrl The ToastControler
   * @param status The boolean status : True --> success, False --> error
   * @param successMesage The success message
   * @param errorMessage The error message
   */
  async manageSuccessErrorToast(toastCtrl : ToastController, status: boolean, successMesage : String, errorMessage : String): Promise<void> {
    let toast;
    if (status === true) {
      toast = await toastCtrl.create({
        message: 'Success : ' + String(successMesage),
        color: 'success',
        translucent: true,
        duration: 3000
      });
    }else{
      toast = await toastCtrl.create({
        message: 'Error : ' + String(errorMessage),
        color: 'danger',
        translucent: true,
        duration: 3000
      });
    }

    await toast.present();
  }

  /**
   * Fonction used to display toast info
   * @param toastCtrl The Toast Controller
   * @param infoMesage The message to display
   */
  async manageInfoToast(toastCtrl : ToastController, infoMesage : String) {

    const toast = await toastCtrl.create({
        message: String(infoMesage),
        translucent: true,
        duration: 3000
      });

    toast.present();
  }

  /**
   * Fonction used to display toast eror
   * @param toastCtrl The Toast Controller
   * @param infoMesage The message to display
   */
  async manageErrorToast(toastCtrl : ToastController, errorMesage : String) {

    const toast = await toastCtrl.create({
        message: String(errorMesage),
        color: 'danger',
        translucent: true,
        duration: 3000
      });

    toast.present();
  }
}

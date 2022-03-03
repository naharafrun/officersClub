import { Injectable } from '@angular/core';
import {SmsRetriever} from '@ionic-native/sms-retriever';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  OTP: string = '';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s';

  constructor(private smsRetriever: SmsRetriever,
              private toastCtrl: ToastController) {
    this.smsRetriever.getAppHash()
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }

  start () {
    this.smsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);
        this.processSMS(res);
      })
      .catch((error: any) => console.error(error));
  }

  processSMS(data) {
    // Design your SMS with App hash so the retriever API can read the SMS without READ_SMS permission
    // Attach the App hash to SMS from your server, Last 11 characters should be the App Hash
    // After that, format the SMS so you can recognize the OTP correctly
    // Here I put the first 6 character as OTP
    const message = data.Message;
    if (message !== -1) {
      this.OTP = message.slice(0, 6);
      console.log(this.OTP);
      this.OTPmessage = 'OTP received. Proceed to register';
      this.presentToast('SMS received with correct app hash', 'bottom', 1500);
    }
  }
  async presentToast(message, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }
}

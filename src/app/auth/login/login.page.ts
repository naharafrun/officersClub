import {Component, OnInit, Renderer2} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {SmsRetriever} from '@ionic-native/sms-retriever/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loading: any;
    showing = false;
    message = false;
    isenabled = false;
    loginData = {username: '', password: ''};
    data: any;
    showPassword = false;
    hideAdmin = true;
    showAdmin = false;
    passwordToggleItem = 'eye-off';
  OTP: string = '123456';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s';
  constructor(public authService: AuthService, public toastCtrl: ToastController,
              public navCtrl: NavController,
              public router: Router,
              private render: Renderer2,
              public loadingController: LoadingController) {
  }

  ionViewWillEnter() {
      if (localStorage.getItem('access_token')) {
          // this.router.navigateByUrl('/home/dashboard');
      }
  }
  ngOnInit() {
      this.showing = false;
      this.message = false;
      this.isenabled = false;
  }

  sendOtp() {
      this.showOTPInput = true;
  }

  otpController(event,next,prev, index){
    if(index === 6) {
      console.log('submit');
    }
    if(event.target.value.length < 1 && prev){
      prev.setFocus();
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
      return 0;
    }
  }

  public onShow(controlToShow) {
    this.render.setStyle(controlToShow, 'visibility', 'visible');
  }
  public onHide(controlToHide) {
    this.render.setStyle(controlToHide, 'visibility', 'hidden');
  }
  doLogin() {
    this.router.navigateByUrl('/home/dashboard');
  }



  async presentToast(message, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

  next() {
    this.showOTPInput = true;
    this.start();
  }

  start() {
    /*this.smsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);
        this.processSMS(res);
      })
      .catch((error: any) => console.error(error));*/
  }

  processSMS(data) {
    // Design your SMS with App hash so the retriever API can read the SMS without READ_SMS permission
    // Attach the App hash to SMS from your server, Last 11 characters should be the App Hash
    // After that, format the SMS so you can recognize the OTP correctly
    // Here I put the first 6 character as OTP
    const message = data.Message;
    if (message != -1) {
      this.OTP = message.slice(0, 6);
      console.log(this.OTP);
      this.OTPmessage = 'OTP received. Proceed to register';
      this.presentToast('SMS received with correct app hash', 'bottom', 1500);
    }
  }

  register() {
    if (this.OTP != '') {
      this.presentToast('You are successfully registered', 'bottom', 1500);
      // this.router.navigate(['/home'])
    }
    else {
      this.presentToast('Your OTP is not valid', 'bottom', 1500);
    }
  }
}

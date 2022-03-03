import {Component, OnInit, Renderer2} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {SmsRetriever} from '@ionic-native/sms-retriever/ngx';
import {SmsService} from "../../services/auth/sms.service";

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
    loginData = {mobile: ""};
    data: any;
    showPassword = false;
    hideAdmin = true;
    showAdmin = false;
    passwordToggleItem = 'eye-off';
  OTP: string = '123456';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s';
  constructor(public authService: AuthService,
              public toastCtrl: ToastController,
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


  otpController(event,next,prev, index){
    console.log(this.OTP);
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

  sendOtp() {
    this.showOTPInput = true;
    const reqBody = {
      "mobile": this.loginData.mobile
    };
    this.authService.getOtpCode(reqBody).then(res => {
      console.log(res);


    });
  }
  tryAgain() {
    // this.sendOtp();
    this.authService.getRegister().then(res => {
      console.log(res);
    });
  }

  register() {
    if (this.OTP !== '') {
      this.presentToast('You are successfully registered', 'bottom', 1500);
      // this.router.navigate(['/home'])
    }
    else {
      this.presentToast('Your OTP is not valid', 'bottom', 1500);
    }
  }
}

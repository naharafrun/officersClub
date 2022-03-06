import {Component, OnInit, Renderer2} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

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
  showAdmin = false;
  OTP: string = '';
  showOTPInput: boolean = false;
  timerOn: number;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 5 s';

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

  timer(remaining) {
    let m: string | number = Math.floor(remaining / 60);
    let s: string | number = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0 && this.timerOn) {
      setTimeout( () =>{
        this.timer(remaining);
      }, 5000);
      return;
    }

    if (!this.timerOn) {
      // Do validate stuff here
      return;
    }

    // Do timeout stuff here
    alert('Timeout for otp');
  }


  doLogin() {
    this.login();
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
    localStorage.setItem('mobile', this.loginData.mobile);
    localStorage.getItem(this.loginData.mobile);

    this.authService.getOtpCode(reqBody).then(res => {
      localStorage.setItem('otp', res['otp']);
      const strOTP = localStorage.getItem('otp');
      console.log(strOTP);
      this.OTP = strOTP.substring(0,7);

      console.log(this.OTP);
    });
  }


  tryAgain() {
    this.sendOtp();
    this.authService.getRegister().then(res => {
      console.log(res);
    });
  }

  login() {
    const reqBody = {
      mobile: localStorage.getItem('mobile'),
      otp: localStorage.getItem('otp')
    };
    if (this.OTP !== '') {
      this.presentToast('You are successfully registered', 'bottom', 1500);
      // this.router.navigate(['/home'])
    }
    else {
      this.presentToast('Your OTP is not valid', 'bottom', 1500);
    }
    this.authService.login(reqBody).then(result => {
      console.log(result);
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {apiUrl} from "../../const";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn: any;
    authState = new BehaviorSubject(false);

  constructor(public htt: HttpClient, private platform: Platform, private router: Router) {
      this.platform.ready().then(() => {
      });
      this.platform.backButton.subscribeWithPriority(10, () => {
          console.log('Handler was called!');
      });
  }

  getOtpCode(mobileNo) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');
      console.log(headers);
      this.htt.post(apiUrl + 'getotp', mobileNo, {headers}).subscribe(data => {
        resolve(data);

      }, err => {
        console.log(err);
      });
    });
  }

  getRegister() {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');
      console.log(headers);
      this.htt.get(apiUrl + 'registration', {headers}).subscribe(data => {
        resolve(data);

      }, err => {
        console.log(err);
      });
    });
  }

}

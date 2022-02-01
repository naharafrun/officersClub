import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';


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

}

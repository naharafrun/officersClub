import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage {
  public searchTerm: string;
  public items: any;
  searching: any = false;
  customers: any;
  constructor(public alertCtrl: AlertController,
              private clipboard: Clipboard) {
  }

}

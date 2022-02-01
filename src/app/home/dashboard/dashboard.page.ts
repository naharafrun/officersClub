import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    public pages = [
         {
            title: 'Orders',
            url: '/home/orders',
            icon: 'cart'
        },
    ];
    businessLogo: string;
    businessName: string;
    public lat: number;
    showing = false;
    lon: number;
    temperature: string;
    icon: string;
    type: string;
    place: string;
    formatteddate: string;
    multipleProducts: any;
    confirmedOrders: any;
    multipleProductsNotPlaced: any;
    orderDetails: any;
    confirmOrderDetails: any;
    invoiceNum: any;
    notPlacedOrder: any;
    myActualDate: any;
    lengthOfConfirmOrder: number;
    lengthOfNotConfirmOrder: number;
    lengthOfNotPlaceOrder: number;
    isenabled = false;
    rowLength: any;
    isenabledActive = false;
    localstorageProductslength: number;
    localStorageProducts: any;
    rowLengthFromServeLocal: number;
    rowLengthCustomer: any;
    localStorageCustomersLength: number;
    rowLengthCustomerServeLocal: number;
    localStorageCustomers: any;
    formattedtime: any;
    timeMeasure: any;
    userName: any;
    weatherData: any;
    currentTemperature: any;
    orderLength: number;
    cumSum: number;
    findLogo: any;

    constructor(
                public httpClient: HttpClient,
                public alertCtrl: AlertController,
                public router: Router,) {
        this.getFormattedDate();
    }

    ngOnInit() {
        this.showing = false;
        this.userName = localStorage.getItem('employee_name');
    }
    getFormattedDate() {
        const dateObj = new Date();
        const timeNow = new Date().getTime();
        const year = dateObj.getFullYear().toString();
        const month = dateObj.getMonth().toString();
        const date = dateObj.getDate().toString();
        const hours = dateObj.getHours().toString();
        const minutes = dateObj.getMinutes().toString();
        const seconds = dateObj.getSeconds().toString();

        const monthArray = ['Jan', 'Feb', 'Mar', 'App', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        this.formatteddate = date + '-' + monthArray[month] + '-' + year;
        this.formattedtime = hours + ':' + minutes + ':' + seconds;
        this.timeMeasure = hours;
        // console.log(this.timeMeasure, 'time');
        // console.log(dateObj, 'time');
    }
    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

}

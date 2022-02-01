import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    userName: string;
    userRole: string;
    supervisor: string;
    roleCheck: string;
    superPermit: string;
    adminPermit: string;
    showing: boolean;
    public adminPages = [
        {
            title: 'Activate User',
            url: '/home/active-inactive-users',
            icon: 'person'
        },
        {
            title: 'Home',
            url: '/home/dashboard',
            icon: 'home-outline'
        },
        {
            title: 'Customers',
            url: '/home/customers',
            icon: 'people'
        },
    ];
    public pages = [
        {
            title: 'Orders',
            url: '/home/orders',
            icon: 'cart',
            subpages: [
                {
                    title: 'Add Order',
                    url: '/home/add-order',
                    icon: 'send'
                }
            ]
        },
    ];
    constructor(public router: Router,) {

    }
    gotoLogout() {
        this.router.navigateByUrl('/login');
        // this.showing = true;
    }
    getEmpRole() {
        this.roleCheck = window.localStorage.getItem('userRole');
        // console.log(this.roleCheck, 'super Admin');
        if (this.roleCheck === 'is_superuser') {
            this.superPermit = this.roleCheck;
            // console.log('match');
        } else if (this.roleCheck === 'is_admin') {
            this.adminPermit = this.roleCheck;
            this.userRole = 'Admin';
            // console.log('admin matched');
        } else if ( this.roleCheck === 'none') {
            this.userRole = 'Admin';
            // console.log('miss');
        } else {
            this.userRole = 'Salesperson';
            // console.log('miss');
        }
    }

}

// open weather api information username : fixitbdonline email: fixitbdonline@gmail.com password: asdfghj123
// flikr for city picture email: fixitbdonline@gmail.com pass: asdfghj123

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {AuthService} from './auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        public authenticationService: AuthService
    ) {}

    canActivate(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}

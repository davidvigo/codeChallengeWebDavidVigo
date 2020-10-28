import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && next.routeConfig.path === 'login') {
            this.router.navigate(['/home/transactions']);
            return false;
        } else if (!accessToken && next.routeConfig.path !== 'login') {
            this.router.navigate(['/login']);
            return false
        }

        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}

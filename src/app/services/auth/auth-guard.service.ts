import { Injectable } from '@angular/core';
import {
  ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';
import { UserInfoService } from '../user/user-info.service';

@Injectable()

export class AuthGuardService implements CanActivate {
  constructor(private userInfo: UserInfoService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return new Promise((resolve) => {
      this.userInfo.subscribe((isLogined) => {
        if (!isLogined) {
          this.router.navigate(['/login']);
        }
        resolve(isLogined);
      });
    });
  }
  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.canActivate(route, state);
  // }
}

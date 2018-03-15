import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserInfoService } from '../user/user-info.service';

@Injectable()

export class rootGuardService implements CanActivate {
  constructor(private userInfo: UserInfoService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.userInfo.subscribe((isLogined) => {
        if (!isLogined) {
          // this.router.navigate(['login']);
        } else {
          this.router.navigate(['/users', this.userInfo.id]);
        }
        resolve(true);
      });
    });
  }
}

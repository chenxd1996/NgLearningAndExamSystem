import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()

export class UserInfoService {
  public loginStateChange: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public userName: string;
  public level: number;
  public id: string;
   constructor(private http: HttpService) {
    this.userName = '';
    this.id = '';
    this.level = 0;
    this.http.getUserInfo().then((res) => {
      if (res && res['status']) {
        this.setUser(res);
      } else {
        this.emit(false);
      }
    });
  };

  // public async isLogined(): Promise<boolean> {
  //   if (this.logined) {
  //     return true;
  //   }
  //   const userInfo = await this.http.getUserInfo();
  //   if (userInfo) {
  //     this.setUser(userInfo);
  //     return true;
  //   }
  //   return false;
  // };

  public setUser(user: Object): void {
    this.userName = user['name'];
    this.id = user['id'];
    this.level = user['level'];
    this.emit(true);
  }

  public deleteUser(): void {
    this.emit(false);
  }
  /**
   * 订阅登录状态的变化
   * @param callback
   * @returns {Subscription}
   */
  public subscribe(callback) {
    return this.loginStateChange.subscribe(callback);
  }

  /**
   * 当登录状态改变时，发射事件
   * @param {boolean} loginState
   */
  private emit(loginState: boolean) {
    this.loginStateChange.next(loginState);
  }
}

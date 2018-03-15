import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import urls from '../../utils/http/urls';
import 'rxjs/add/operator/map';
import {EncryptService} from '../encrypt/encrypt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class HttpService {
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient, private encrypt: EncryptService) {}

  /**
   * 登录
   * @param {Object} payload {rawPassword: string, id: string}
   * @returns {Promise<void>}
   */
  public async login(payload: Object): Promise<Object> {
    // 进行加密
    payload['password'] = this.encrypt.encrypt(payload['rawPassword']);
    this.emit(true);
    const res = await this.post(urls.login, payload);
    this.emit(false);
    return res;
  }

  /**
   * 获取已登录的用户信息
   * @returns {Promise<Object>}
   */
  public async getUserInfo(): Promise<Object> {
    this.emit(true);
    const userInfo = await this.get(urls.getUserInfo);
    this.emit(false);
    if (userInfo['status']) {
      return userInfo;
    } else {
      return null;
    }
  }

  /**
   * 登出
   * @returns {Promise<boolean>}
   */
  public async logout(): Promise<Object> {
    this.emit(true);
    const res = await this.get(urls.logout);
    this.emit(false);
    return res;
  };

  public emit(isLoading) {
    this.loading.next(isLoading);
  }

  private async post(url: string, payload: Object = {}) {
    return await this.http.post(url, payload).toPromise();
  }

  private async get(url: string, params: Object = null) {
    if (params) {
      const httpParams = new HttpParams();
      for (const key in params) {
        if (key) {
          httpParams.set(key, params[key]);
        }
      }
      return await this.http.get(url, {params: httpParams}).toPromise();
    }
    return await this.http.get(url).toPromise();
  }
}

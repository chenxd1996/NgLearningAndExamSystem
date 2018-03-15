import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import urls from '../../utils/http/urls';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {
  /**
   * 拦截http请求，为请求的url加上服务器地址前缀
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const cloneReq = req.clone({
       url: `${urls.prefix}${req.url}`,
       withCredentials: true
    });
    return next.handle(cloneReq);
  }
};

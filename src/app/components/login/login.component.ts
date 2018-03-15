import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import { UserInfoService } from '../../services/user/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private form: Object;
  constructor(private http: HttpService,
              private userInfo: UserInfoService, private router: Router) {
    this.form = {};
  }

  async login(): Promise<void> {
    const res = await this.http.login(this.form);
    this.userInfo.setUser(res);
    this.router.navigate(['/users', this.userInfo.id]);
  }
}

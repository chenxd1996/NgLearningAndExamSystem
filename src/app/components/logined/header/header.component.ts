import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../../services/user/user-info.service';
import { HttpService } from '../../../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userInfo: UserInfoService, public http: HttpService, private router: Router) {
  }

  ngOnInit() {}

  public logout() {
    this.http.logout();
    this.userInfo.deleteUser();
    // this.router.navigate(['/login']);
  }
}

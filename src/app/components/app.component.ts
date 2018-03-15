import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user/user-info.service';
import { HttpService } from '../services/http/http.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('InOut', [
      transition(':leave', [
        animate(1000)
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(public userInfo: UserInfoService, public http: HttpService) {}

  ngOnInit() {
  }
}

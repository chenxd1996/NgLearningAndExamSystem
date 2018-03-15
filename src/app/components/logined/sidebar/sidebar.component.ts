import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isFolded: boolean;
  constructor() {
  }

  ngOnInit() {
    this.isFolded = true;
  }
  unfold() {
    this.isFolded = false;
  }
  fold() {
    this.isFolded = true;
  }
}

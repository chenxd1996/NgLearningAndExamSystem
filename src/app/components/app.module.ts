import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {HttpService} from '../services/http/http.service';
import {HttpInterceptorService} from '../services/http/http-interceptor.service';
import { EncryptService } from '../services/encrypt/encrypt';
import { UserInfoService } from '../services/user/user-info.service';
import { LoginedComponent } from './logined/logined.component';
import { HeaderComponent } from './logined/header/header.component';
import { ContentComponent } from './logined/content/content.component';
import { SidebarComponent} from './logined/sidebar/sidebar.component';
import { LoadingComponent } from './loading/loading.component';
import { UserManageComponent } from './logined/content/user-manage/user-manage.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';
import { rootGuardService } from '../services/auth/root-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [rootGuardService]
      },
      {
        path: 'users/:id',
        component: LoginedComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginedComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    LoadingComponent,
    UserManageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [
    { provide: HttpService, useClass: HttpService },
    { provide: EncryptService, useClass: EncryptService},
    { provide: UserInfoService, useClass: UserInfoService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: AuthGuardService, useClass: AuthGuardService },
    { provide: rootGuardService, useClass: rootGuardService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

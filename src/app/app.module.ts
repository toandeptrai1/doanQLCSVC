import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProfileComponent } from './profile/profile.component';
import { AddUserComponent } from './home/add-user/add-user.component';
import { EditUserComponent } from './home/edit-user/edit-user.component';
import { AddPhongComponent } from './phong/add-phong/add-phong.component';
import { EditPhongComponent } from './phong/edit-phong/edit-phong.component';
import { ListPhongComponent } from './phong/list-phong/list-phong.component';
import { ListTaiSanComponent } from './taisan/list-tai-san/list-tai-san.component';
import { EditTaiSanComponent } from './taisan/edit-tai-san/edit-tai-san.component';
import { AddTaiSanComponent } from './taisan/add-tai-san/add-tai-san.component';
import { TaisanDetailComponent } from './taisan/taisan-detail/taisan-detail.component';
import { PhongDetailComponent } from './phong/phong-detail/phong-detail.component';
import { DstsPhongComponent } from './phong/dsts-phong/dsts-phong.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PaginatorComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    AddPhongComponent,
    EditPhongComponent,
    ListPhongComponent,
    ListTaiSanComponent,
    EditTaiSanComponent,
    AddTaiSanComponent,
    TaisanDetailComponent,
    PhongDetailComponent,
    DstsPhongComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

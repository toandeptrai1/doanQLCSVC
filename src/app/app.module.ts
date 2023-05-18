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
import { PhanCongQLComponent } from './home/phan-cong-ql/phan-cong-ql.component';
import { ListTTDCComponent } from './thongTinDC/list-ttdc/list-ttdc.component';
import { LapTTDCComponent } from './thongTinDC/lap-ttdc/lap-ttdc.component';
import { FormsModule } from '@angular/forms';
import { LapCaTrucComponent } from './catruc/lap-ca-truc/lap-ca-truc.component';
import { TtdcDetaiComponent } from './thongTinDC/ttdc-detai/ttdc-detai.component';
import { ListThongTinSuaComponent } from './thongTinSua/list-thong-tin-sua/list-thong-tin-sua.component';
import { LapThongTinSuaComponent } from './thongTinSua/lap-thong-tin-sua/lap-thong-tin-sua.component';
import { UpdateTTComponent } from './phong/update-tt/update-tt.component';
import { TtsuaDetailComponent } from './thongTinSua/ttsua-detail/ttsua-detail.component';
import { LapDSThanhLyComponent } from './ThanhLyTS/lap-dsthanh-ly/lap-dsthanh-ly.component';
import { ListDSThanhLyComponent } from './ThanhLyTS/list-dsthanh-ly/list-dsthanh-ly.component';
import { ThanhLyDetailComponent } from './ThanhLyTS/thanh-ly-detail/thanh-ly-detail.component';
import { HomePageComponent } from './home-page/home-page.component';

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
    DstsPhongComponent,
    PhanCongQLComponent,
    ListTTDCComponent,
    LapTTDCComponent,
    LapCaTrucComponent,
    TtdcDetaiComponent,
    ListThongTinSuaComponent,
    LapThongTinSuaComponent,
    UpdateTTComponent,
    TtsuaDetailComponent,
    LapDSThanhLyComponent,
    ListDSThanhLyComponent,
    ThanhLyDetailComponent,
    HomePageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
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

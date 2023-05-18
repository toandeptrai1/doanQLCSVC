import { ThanhLyDetailComponent } from './ThanhLyTS/thanh-ly-detail/thanh-ly-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { AddUserComponent } from './home/add-user/add-user.component';
import { EditUserComponent } from './home/edit-user/edit-user.component';
import { ListPhongComponent } from './phong/list-phong/list-phong.component';
import { AddPhongComponent } from './phong/add-phong/add-phong.component';
import { EditPhongComponent } from './phong/edit-phong/edit-phong.component';
import { ListTaiSanComponent } from './taisan/list-tai-san/list-tai-san.component';
import { AddTaiSanComponent } from './taisan/add-tai-san/add-tai-san.component';
import { EditTaiSanComponent } from './taisan/edit-tai-san/edit-tai-san.component';
import { TaisanDetailComponent } from './taisan/taisan-detail/taisan-detail.component';
import { PhongDetailComponent } from './phong/phong-detail/phong-detail.component';
import { PhanCongQLComponent } from './home/phan-cong-ql/phan-cong-ql.component';
import { ListTTDCComponent } from './thongTinDC/list-ttdc/list-ttdc.component';
import { LapTTDCComponent } from './thongTinDC/lap-ttdc/lap-ttdc.component';
import { LapCaTrucComponent } from './catruc/lap-ca-truc/lap-ca-truc.component';
import { TtdcDetaiComponent } from './thongTinDC/ttdc-detai/ttdc-detai.component';
import { ListThongTinSuaComponent } from './thongTinSua/list-thong-tin-sua/list-thong-tin-sua.component';
import { LapThongTinSuaComponent } from './thongTinSua/lap-thong-tin-sua/lap-thong-tin-sua.component';
import { UpdateTTComponent } from './phong/update-tt/update-tt.component';
import { TtsuaDetailComponent } from './thongTinSua/ttsua-detail/ttsua-detail.component';
import { ListDSThanhLyComponent } from './ThanhLyTS/list-dsthanh-ly/list-dsthanh-ly.component';
import { LapDSThanhLyComponent } from './ThanhLyTS/lap-dsthanh-ly/lap-dsthanh-ly.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: 'QLCSVC/login', component:LoginComponent},
  {path: 'QLCSVC/thanhly/lapTTThanhLy', component:LapDSThanhLyComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/thanhly', component:ListDSThanhLyComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/thanhly/detail/:id', component:ThanhLyDetailComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/ttsua', component:ListThongTinSuaComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/ttsua/lapttsua', component:LapThongTinSuaComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/ttsua/detail/:id', component:TtsuaDetailComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/ttdc/detail/:id', component:TtdcDetaiComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/ttdc/listttdc', component:ListTTDCComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/ttdc/lapttdc', component:LapTTDCComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan/editTaiSan/:id', component:EditTaiSanComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan/detail/:id', component:TaisanDetailComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan/addTaiSan', component:AddTaiSanComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan', component:ListTaiSanComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong', component:ListPhongComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/capnhatttts/:id', component:UpdateTTComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/addPhong', component:AddPhongComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/editPhong/:maPhong', component:EditPhongComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/chitietphong/:maPhong', component:PhongDetailComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user/profile', component:ProfileComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user/phancongquanly', component:PhanCongQLComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user/addUser', component:AddUserComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user/editUser/:username', component:EditUserComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user', component:HomeComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC', component:HomePageComponent,canActivate:[LoginGuard]},
  { path: '',   redirectTo: '/QLCSVC', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

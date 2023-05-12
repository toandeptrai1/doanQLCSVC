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

const routes: Routes = [
  {path: 'QLCSVC/login', component:LoginComponent},
  {path: 'QLCSVC/taisan/editTaiSan/:id', component:EditTaiSanComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan/detail/:id', component:TaisanDetailComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan/addTaiSan', component:AddTaiSanComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/taisan', component:ListTaiSanComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong', component:ListPhongComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/addPhong', component:AddPhongComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/editPhong/:maPhong', component:EditPhongComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/phong/chitietphong/:maPhong', component:PhongDetailComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user/profile', component:ProfileComponent,canActivate:[LoginGuard]},

  {path: 'QLCSVC/user/addUser', component:AddUserComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC/user/editUser/:username', component:EditUserComponent,canActivate:[LoginGuard]},
  {path: 'QLCSVC', component:HomeComponent,canActivate:[LoginGuard]},
  { path: '',   redirectTo: '/QLCSVC', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

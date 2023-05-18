import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { TaisanService } from './../../services/taisan.service';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { TaiSan } from 'src/app/models/TaiSan';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-list-tai-san',
  templateUrl: './list-tai-san.component.html',
  styleUrls: ['./list-tai-san.component.css']
})
export class ListTaiSanComponent implements OnInit {
  taisans$:Observable<ApiResponse<TaiSan>>;
  currentUser$:Observable<User>;
  currentUser:User;
  constructor(private taisanService:TaisanService,private router:Router,private userService:UserService) {

  }
  ngOnInit(): void {
    this.currentUser$=this.userService.getUser(JSON.parse(localStorage.getItem("token")).username);
    this.currentUser$.subscribe(data => {this.currentUser=data});
    this.taisans$=this.taisanService.getTaiSans(0,5);

  }
  isTruongKhoa():boolean {
    return this.currentUser.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');

  }
  navigateToAddPage(){
    this.router.navigateByUrl("/QLCSVC/taisan/addTaiSan");

  }
  navigateToEditPage(id:number){
    this.router.navigateByUrl(`/QLCSVC/taisan/editTaiSan/${id}`);

  }
  goToPage(page:number){
    this.taisans$=this.taisanService.getTaiSans(page,5);


  }



}

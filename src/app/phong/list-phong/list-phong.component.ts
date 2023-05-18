import { ToastrService } from 'ngx-toastr';
import { PhongService } from 'src/app/services/phong.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Phong } from 'src/app/models/Phong';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-phong',
  templateUrl: './list-phong.component.html',
  styleUrls: ['./list-phong.component.css']
})
export class ListPhongComponent implements OnInit {
  phongs:Observable<ApiResponse<Phong>>;
  currentUser$:Observable<User>;
  user:User;
  constructor(private router:Router,private phongService:PhongService,private toastr:ToastrService,private userService:UserService ) {

  }
  ngOnInit(): void {
    this.currentUser$=this.userService.getUser(JSON.parse(localStorage.getItem("token")).username);
    this.currentUser$.subscribe(data => {this.user=data});

    this.phongs=this.phongService.getPhongs();
  }
  isTruongKhoa():boolean {
    return this.user.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');

  }
  navigateToPage(){
    this.router.navigateByUrl("/QLCSVC/phong/addPhong");
  }
  navigateToEditPage(maPhong:number){
    this.router.navigateByUrl(`/QLCSVC/phong/editPhong/${maPhong}`)

  }
  deletePhong(phong:Phong){
    this.phongService.deletePhong(phong).pipe(
      catchError(()=>{
        this.toastr.error("Xóa không thành công");
        throw new Error("Xóa không thành công");
      }
      )
    ).subscribe(data =>{
      if(data){
        this.phongs=this.phongService.getPhongs();
        this.toastr.success("Xóa thành công")
      }else{
        this.toastr.error("Xóa không thành công");
      }
    })


  }
  goToPage(page:number){
    this.phongs=this.phongService.getPhongs(page,5);


  }




}

import { ToastrService } from 'ngx-toastr';
import { PhongService } from 'src/app/services/phong.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Phong } from 'src/app/models/Phong';
import { ApiResponse } from 'src/app/models/ApiResponse';

@Component({
  selector: 'app-list-phong',
  templateUrl: './list-phong.component.html',
  styleUrls: ['./list-phong.component.css']
})
export class ListPhongComponent implements OnInit {
  phongs:Observable<ApiResponse<Phong>>;
  constructor(private router:Router,private phongService:PhongService,private toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.phongs=this.phongService.getPhongs();
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




}

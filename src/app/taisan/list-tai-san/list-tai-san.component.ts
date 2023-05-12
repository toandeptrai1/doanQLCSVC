import { Router } from '@angular/router';
import { TaisanService } from './../../services/taisan.service';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { TaiSan } from 'src/app/models/TaiSan';

@Component({
  selector: 'app-list-tai-san',
  templateUrl: './list-tai-san.component.html',
  styleUrls: ['./list-tai-san.component.css']
})
export class ListTaiSanComponent implements OnInit {
  taisans$:Observable<ApiResponse<TaiSan>>;

  constructor(private taisanService:TaisanService,private router:Router) {

  }
  ngOnInit(): void {
   this.taisans$=this.taisanService.getTaiSans(0,5);

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

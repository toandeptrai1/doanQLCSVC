import { Router } from '@angular/router';
import { TtdcService } from './../../services/ttdc.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ThongTinDiChuyen } from 'src/app/models/ThongTinDiChuyen';

@Component({
  selector: 'app-list-ttdc',
  templateUrl: './list-ttdc.component.html',
  styleUrls: ['./list-ttdc.component.css']
})
export class ListTTDCComponent implements OnInit {
  ttdcs$:Observable<ApiResponse<ThongTinDiChuyen>>;

  constructor(private ttdcService:TtdcService,private router:Router){



  }
  ngOnInit(): void {
    this.ttdcs$=this.ttdcService.getAll(0,4);

  }
  navigateToAddPage(){
    this.router.navigate(['/QLCSVC/ttdc/lapttdc'])
  }
  goToPage(page:number){
    this.ttdcs$=this.ttdcService.getAll(page,4);


  }

}

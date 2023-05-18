import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ThongtinSua } from 'src/app/models/ThongTinSua';
import { ThongTinThanhLy } from 'src/app/models/ThongTinThanhLy';
import { ThanhlyService } from 'src/app/services/thanhly.service';

@Component({
  selector: 'app-list-dsthanh-ly',
  templateUrl: './list-dsthanh-ly.component.html',
  styleUrls: ['./list-dsthanh-ly.component.css']
})
export class ListDSThanhLyComponent implements OnInit {
  tttls$:Observable<ApiResponse<ThongTinThanhLy>>;

  constructor(private thanhLyService:ThanhlyService,private router:Router){



  }
  ngOnInit(): void {
    this.tttls$=this.thanhLyService.getAll(0,4);

  }
  navigateToAddPage(){
    this.router.navigate(['/QLCSVC/thanhly/lapTTThanhLy'])
  }
  goToPage(page:number){
    this.tttls$=this.thanhLyService.getAll(page,4);
  }


}

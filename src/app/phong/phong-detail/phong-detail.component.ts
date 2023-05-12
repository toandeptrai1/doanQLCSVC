import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Phong } from 'src/app/models/Phong';
import { TaiSan } from 'src/app/models/TaiSan';
import { PhongService } from 'src/app/services/phong.service';
import { TaisanService } from 'src/app/services/taisan.service';

@Component({
  selector: 'app-phong-detail',
  templateUrl: './phong-detail.component.html',
  styleUrls: ['./phong-detail.component.css']
})
export class PhongDetailComponent implements OnInit {
  phong$:Observable<Phong>;
  maPhong:number;
  taisans$:Observable<ApiResponse<TaiSan>>;


  constructor(private phongService:PhongService,private route:ActivatedRoute,private taisanService:TaisanService){

  }


  ngOnInit(): void {
    this.route.params.subscribe(params =>this.maPhong=params['maPhong']);
    this.phong$=this.phongService.getPhong(this.maPhong);
    console.log(this.maPhong);
    this.taisans$=this.taisanService.getTaiSanByPhong(0,5,this.maPhong);

  }
  goToPage(page:number){
    this.taisans$=this.taisanService.getTaiSanByPhong(page,5,this.maPhong);

  }
}

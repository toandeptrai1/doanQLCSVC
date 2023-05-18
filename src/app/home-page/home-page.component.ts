import { TaisanService } from './../services/taisan.service';

import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { PhongService } from '../services/phong.service';
import { UserService } from '../services/user.service';
import { Observable, map } from 'rxjs';
import { Phong } from '../models/Phong';
import { ApiResponse } from '../models/ApiResponse';
import { User } from '../models/User';
import { TaiSan } from '../models/TaiSan';
import { TrangThai } from '../models/TrangThai';
import { ThongBao } from '../models/ThongBao';
import { ThongbaoService } from '../services/thongbao.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  phongs$:Observable<ApiResponse<Phong>>
  users$:Observable<ApiResponse<User>>
  taiSans$:Observable<ApiResponse<TaiSan>>
  trangThais:TrangThai[];
  taiSans:TaiSan[];
  chartValue:any=[];
  thongBaos$:Observable<ApiResponse<ThongBao>>;
  currentUser$:Observable<User>;
  user:User;
  constructor(private taisanService:TaisanService,private thongBaoService:ThongbaoService
    ,private phongService:PhongService,private userService:UserService){

  }

  ngOnInit(): void {
    this.currentUser$=this.userService.getUser(JSON.parse(localStorage.getItem("token")).username);
    this.currentUser$.subscribe(data => {this.user=data});
    this.thongBaos$=this.thongBaoService.getAllTB();
    this.phongs$=this.phongService.getPhongs(0,5);
    this.phongs$.subscribe(data=>console.log(data))
    this.users$=this.userService.getUsers();
    this.taiSans$=this.taisanService.getTaiSans(0,4);
    this.taisanService.getTaiSans(0,20).subscribe(taiSans=>{
      this.taiSans=taiSans.data.page.content;
      this.loadChart();
    })


  }
  isTruongKhoa():boolean {
    return this.user?.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');

  }
  public loadChart(){
    const chartValue:any=[];

    this.phongService.getTrangThais().pipe(map((trangThais)=>{

      trangThais.map((tt)=>{
        let count=this.taiSans.filter(x=>x.trangThai.maTT==tt.maTT).length;
        chartValue.push({name:tt.tenTT,value:count})

      })

      return chartValue;

    })).subscribe(data=>{
      const myChart = echarts.init(document.getElementById('trafficChart'));
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '0%',
        left: 'center'
      },
      series: [{
        name: 'Tài sản',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }]
    });

    })


  }


}

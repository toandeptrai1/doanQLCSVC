import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lap-ca-truc',
  templateUrl: './lap-ca-truc.component.html',
  styleUrls: ['./lap-ca-truc.component.css']
})
export class LapCaTrucComponent implements OnInit {
  ngayBatDau:Date=new Date("5/15/2023");
  ngayKetThuc:Date;

  constructor(){

  }
  ngOnInit(): void {
    this.ngayKetThuc=new Date(this.ngayBatDau);
    
    console.log(this.ngayBatDau)
    console.log(this.ngayKetThuc)

  }



}

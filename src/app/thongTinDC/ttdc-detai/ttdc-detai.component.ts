import { ActivatedRoute } from '@angular/router';
import { TtdcService } from './../../services/ttdc.service';
import { Component, OnInit } from '@angular/core';
import { ThongTinDiChuyen } from 'src/app/models/ThongTinDiChuyen';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ttdc-detai',
  templateUrl: './ttdc-detai.component.html',
  styleUrls: ['./ttdc-detai.component.css']
})
export class TtdcDetaiComponent implements OnInit {
  ttdc$:Observable<ThongTinDiChuyen>;
  maTTDC:any;

  constructor(private ttdcService:TtdcService,private route:ActivatedRoute){


  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>this.maTTDC=params.get('id'));
    this.ttdc$=this.ttdcService.getTTDC(this.maTTDC);

  }


}

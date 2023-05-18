import { ThanhlyService } from './../../services/thanhly.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ThongTinThanhLy } from 'src/app/models/ThongTinThanhLy';

@Component({
  selector: 'app-thanh-ly-detail',
  templateUrl: './thanh-ly-detail.component.html',
  styleUrls: ['./thanh-ly-detail.component.css']
})
export class ThanhLyDetailComponent implements OnInit {
  tttl$:Observable<ThongTinThanhLy>;
  maThanhLy:any;

  constructor(private thanhlyService:ThanhlyService,private route:ActivatedRoute){


  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>this.maThanhLy=params.get('id'));
    this.tttl$=this.thanhlyService.getTTTL(this.maThanhLy);

  }

}

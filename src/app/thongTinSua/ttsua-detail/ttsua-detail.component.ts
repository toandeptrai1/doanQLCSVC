import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ThongtinSua } from 'src/app/models/ThongTinSua';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-ttsua-detail',
  templateUrl: './ttsua-detail.component.html',
  styleUrls: ['./ttsua-detail.component.css']
})
export class TtsuaDetailComponent implements OnInit {
  ttsua$:Observable<ThongtinSua>;
  maTTSua:any;

  constructor(private ttsuaServic:TtsService,private route:ActivatedRoute){


  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>this.maTTSua=params.get('id'));
    this.ttsua$=this.ttsuaServic.getTTS(this.maTTSua);

  }

}

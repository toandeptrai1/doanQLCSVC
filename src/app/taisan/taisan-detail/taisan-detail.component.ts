import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaisanService } from 'src/app/services/taisan.service';
import { Observable } from 'rxjs';
import { TaiSan } from 'src/app/models/TaiSan';

@Component({
  selector: 'app-taisan-detail',
  templateUrl: './taisan-detail.component.html',
  styleUrls: ['./taisan-detail.component.css']
})
export class TaisanDetailComponent implements OnInit {

  taisan$:Observable<TaiSan>;
  maTS:number;
  constructor(private taisanService:TaisanService,private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {this.maTS = params["id"]});
    this.taisan$=this.taisanService.getTS(this.maTS);
  }

}

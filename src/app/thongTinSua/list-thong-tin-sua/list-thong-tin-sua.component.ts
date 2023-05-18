import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ThongtinSua } from 'src/app/models/ThongTinSua';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-list-thong-tin-sua',
  templateUrl: './list-thong-tin-sua.component.html',
  styleUrls: ['./list-thong-tin-sua.component.css']
})
export class ListThongTinSuaComponent {
  ttsuas$:Observable<ApiResponse<ThongtinSua>>;

  constructor(private ttsuaService:TtsService,private router:Router){



  }
  ngOnInit(): void {
    this.ttsuas$=this.ttsuaService.getAllTTS(0,4);

  }
  navigateToAddPage(){
    this.router.navigate(['/QLCSVC/ttsua/lapttsua'])
  }
  goToPage(page:number){
    this.ttsuas$=this.ttsuaService.getAllTTS(page,4);
  }

}

import { ThongtinSua } from './../models/ThongTinSua';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  url:string="http://localhost:8080/QLCSVC/api/ttsua";

  constructor(private http:HttpClient) {

  }

  public addTTS(tts:ThongtinSua):Observable<ThongtinSua> {
      return this.http.post<ThongtinSua>(`${this.url}/add`,tts);
  }
  public getTTS(maTTSua:any):Observable<ThongtinSua>{
    return this.http.post<ThongtinSua>(`${this.url}/getTTSua`,{maTTSua:maTTSua});
  }
  public getAllTTS(page:number=0,size:number=4):Observable<ApiResponse<ThongtinSua>>{
    return this.http.post<ApiResponse<ThongtinSua>>(`${this.url}`,{page:page,size:size});
  }

}

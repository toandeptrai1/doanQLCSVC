import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThongBao } from '../models/ThongBao';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ThongbaoService {
  url:string="http://localhost:8080/QLCSVC/api/thongbao"

  constructor(private http:HttpClient) {

  }
  public addThongBao(tb:ThongBao):Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/add`,tb);
  }
  public getAllTB(page:number=0,size:number=6):Observable<ApiResponse<ThongBao>> {
    return this.http.post<ApiResponse<ThongBao>>(`${this.url}`,{page:page,size:size});
  }
}

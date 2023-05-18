import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThongTinThanhLy } from '../models/ThongTinThanhLy';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ThanhlyService {

  url:string = 'http://localhost:8080/QLCSVC/api/ttthanhly'

  constructor(private http:HttpClient) {

   }
   public addTTTL(ttdtl:ThongTinThanhLy):Observable<boolean> {

    return this.http.post<boolean>(`${this.url}/add`,ttdtl);

   }
   public getAll(page:number,size:number):Observable<ApiResponse<ThongTinThanhLy>>{
    return this.http.post<ApiResponse<ThongTinThanhLy>>(this.url,{page,size});
   }
   public getTTTL(maThanhLy:any):Observable<ThongTinThanhLy>{
    return this.http.post<ThongTinThanhLy>(`http://localhost:8080/QLCSVC/api/ttthanhly/getTTTL`,{maThanhLy:maThanhLy});
   }
}

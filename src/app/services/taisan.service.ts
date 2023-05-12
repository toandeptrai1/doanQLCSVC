import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { TaiSan } from '../models/TaiSan';
import { Observable } from 'rxjs';
import { DanhMucTaiSan } from '../models/DanhMucTaiSan';

@Injectable({
  providedIn: 'root'
})
export class TaisanService {

  url="http://localhost:8080/QLCSVC/api/taisan";

  constructor(private http:HttpClient) {

   }

   public getTaiSans(page:number,size:number):Observable<ApiResponse<TaiSan>>{

     return  this.http.post<ApiResponse<TaiSan>>(this.url,{page:page,size:size});
   }

   public getTS(id:number):Observable<TaiSan>{
    return this.http.get<TaiSan>(`${this.url}/getTS/${id}`)
   }

   public addTS(taisan:TaiSan):Observable<TaiSan>{

    return this.http.post<TaiSan>(`${this.url}/add`,taisan);

   }

   public updateTS(taisan:TaiSan):Observable<boolean>{
     return  this.http.post<boolean>(`${this.url}/update`,taisan)
   }

   public deleteTS(taisan:TaiSan):Observable<boolean>{
    return  this.http.post<boolean>(`${this.url}/delete`,taisan)
   }

   public getDanhMucs():Observable<DanhMucTaiSan[]>{
    return this.http.get<DanhMucTaiSan[]>("http://localhost:8080/QLCSVC/api/danhmucTS");
   }
   public getTaiSanByPhong(page:number,size:number,maPhong:number){
    return this.http.post<ApiResponse<TaiSan>>("http://localhost:8080/QLCSVC/api/taisan/getTSByPhong",{page:page, size:size, maPhong:maPhong})
   }
}

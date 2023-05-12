import { Phong } from './../models/Phong';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { TrangThai } from '../models/TrangThai';
import { DanhMucPhong } from '../models/DanhMucPhong';

@Injectable({
  providedIn: 'root',
})
export class PhongService {
  url: string = 'http://localhost:8080/QLCSVC/api/phong';

  constructor(private http: HttpClient) {

  }
  getAllPhong():Observable<Phong[]>{
    return this.http.get<Phong[]>(this.url);
  }
  getDanhMucPhongs():Observable<DanhMucPhong[]>{

    return this.http.get<DanhMucPhong[]>(`${this.url}/danhmucs`)

  }


  getPhongs(page: number = 0,size: number = 5): Observable<ApiResponse<Phong>> {
    return this.http.post<ApiResponse<Phong>>(`${this.url}/getAll`, { page: page, size: size });
  }
  addPhong(phong:Phong): Observable<Phong>{
    return this.http.post<Phong>(`${this.url}/add`,phong);
  }
  getTrangThais():Observable<TrangThai[]>{
    return this.http.get<TrangThai[]>(`http://localhost:8080/QLCSVC/api/trangthai/getAll`);
  }
  getPhong(id:number):Observable<Phong>{
    return this.http.get<Phong>(`${this.url}/getPhong/${id}`);

  }
  updatePhong(phong:Phong):Observable<boolean>{
    return this.http.post<boolean>(`${this.url}/update`,phong);
  }
  deletePhong(phong:Phong):Observable<boolean>{
    return this.http.post<boolean>(`${this.url}/delete`,phong);

  }
}

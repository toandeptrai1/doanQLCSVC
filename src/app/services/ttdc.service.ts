import { ThongTinDiChuyen } from './../models/ThongTinDiChuyen';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class TtdcService {
  url: string = 'http://localhost:8080/QLCSVC/api/ttdc';

  constructor(private http: HttpClient) {}
  public addTTDC(ttdc: ThongTinDiChuyen): Observable<ThongTinDiChuyen> {
    return this.http.post<ThongTinDiChuyen>(`${this.url}/add`, ttdc);
  }
  public getAll(
    page: number,
    size: number
  ): Observable<ApiResponse<ThongTinDiChuyen>> {
    return this.http.post<ApiResponse<ThongTinDiChuyen>>(this.url, {
      page,
      size,
    });
  }
  public getTTDC(maTTDC: any): Observable<ThongTinDiChuyen> {
    return this.http.post<ThongTinDiChuyen>(
      `http://localhost:8080/QLCSVC/api/ttdc/getTTDC`,
      { maTTDC: maTTDC }
    );
  }
}

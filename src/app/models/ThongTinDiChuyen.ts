import { TaiSan } from "./TaiSan";
import { User } from "./User";

export interface ThongTinDiChuyen
{
     maTTDC:number;
     tenTTDC:string;
     maPhongDC:number;
     tenPhongDC:string;
     maPhong:number;
     tenPhong:number;

     moTa:string;
     createdDate:string;

     taiSans:TaiSan[];

     user:User;


}

import { DanhMucPhong } from "./DanhMucPhong";
import { TrangThai } from "./TrangThai";
import { User } from "./User";

export interface Phong{
    maPhong:number;
    tenPhong:string;
    chieuDai:string;
    chieuRong:string;
    mota:string;
    vitri:string;
    image:string;
    page:number;
    size:number;
    users:User[];
    danhMucPhong:DanhMucPhong;
    trangThai:TrangThai;

}

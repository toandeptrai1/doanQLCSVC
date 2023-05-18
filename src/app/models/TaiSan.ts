import { DanhMucTaiSan } from "./DanhMucTaiSan";
import { Phong } from "./Phong";
import { TrangThai } from "./TrangThai";

export interface TaiSan{
  maTS:number;
  tenTS:string;
  namSanXuat:number;
  hangSanXuat:string;
  image:string;
  imageQR:string;
  boNho:string;
  viSuLy:string;
  boMachChu:string;
  cacXuLyDoHoa:string;
  khac:string;
  congXuat:string;
  phong:Phong;
  maPhong:number;
  trangThai:TrangThai;
  danhMucTaiSan:DanhMucTaiSan;
  checked?: boolean;
  

}

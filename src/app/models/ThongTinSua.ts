import { Phong } from "./Phong";
import { TaiSan } from "./TaiSan";
import { User } from "./User";

export interface ThongtinSua{
  maTTSua:number;
  tenTTSua:string;
  moTa:string;
  chiPhi:number;
  phong:Phong;
  taiSans:TaiSan[];
  user:User;
  createdDate:string;


}

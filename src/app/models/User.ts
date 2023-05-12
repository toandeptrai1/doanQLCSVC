import { ChucVu } from "./ChucVu";
import { Phong } from "./Phong";
import { Role } from "./Role";

export interface User{
  id: number;
  name: string;
  username:string;
  password:string;
  tuoi:number;
  email:string;
  phone:string;
  diachi:string;
  chucVu:ChucVu;
  image:string;
  phongs:Phong[];
  roles:Role[];
}

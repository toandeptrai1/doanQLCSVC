import { User } from 'src/app/models/User';
import { TaiSan } from 'src/app/models/TaiSan';
export interface ThongTinThanhLy{
   maThanhLy:number;
   tenThanhLy:string;
   moTa:string;
   coQuanTL:string;
   tienThu:number;
   taiSans:TaiSan[];
   user:User;
   createdDate:string;

}

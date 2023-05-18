import { ThongbaoService } from './../../services/thongbao.service';
import { TtdcService } from './../../services/ttdc.service';
import { ToastrService } from 'ngx-toastr';
import { PhongService } from './../../services/phong.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Phong } from 'src/app/models/Phong';
import { TaiSan } from 'src/app/models/TaiSan';
import { TaisanService } from 'src/app/services/taisan.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ThongBao } from 'src/app/models/ThongBao';

@Component({
  selector: 'app-lap-ttdc',
  templateUrl: './lap-ttdc.component.html',
  styleUrls: ['./lap-ttdc.component.css']
})
export class LapTTDCComponent implements OnInit {
  taisans$:Observable<ApiResponse<TaiSan>>;
  phongs$:Observable<Phong[]>;
  taiSans:TaiSan[];
  submitted:boolean=false;
  dsdcForm:FormGroup;


  constructor(private taisanService:TaisanService,private router:Router,private toastr:ToastrService,private thongbaoService:ThongbaoService,
    private phongService:PhongService,private fb:FormBuilder,private ttdcService:TtdcService,private userService:UserService) {

  }
  ngOnInit(): void {

    this.userService.currentUser$.subscribe(user => {
      this.dsdcForm=this.fb.group({
        maPhong:new FormControl("",Validators.required),
        maPhongDC:new FormControl("",Validators.required),
        moTa:new FormControl("",Validators.required),
        tenTTDC:new FormControl("",Validators.required),
        taiSans:new FormControl([],Validators.required),
        user:new FormControl(user,Validators.required)
      })
    })
    this.taisans$=this.taisanService.getTaiSans(0,10);
    this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)
    this.phongs$=this.phongService.getAllPhong();




  }
  checkAllCheckBox(ev: any) {
		this.taiSans.forEach(x => x.checked = ev.target.checked)
	}
  isAllCheckBoxChecked() {
		return this.taiSans.every(p => p.checked);
	}
  goToPage(page:number){
    this.taisans$=this.taisanService.getTaiSans(page,10);
    this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)


  }
  phongFromChange(maPhong:any){
    this.taisans$= this.taisanService.getTaiSanByPhong(0,10,maPhong);
    this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)
  }
  updateTSSelect(){
    const taisansSelected= this.taiSans.filter(x=>x.checked===true);
    this.dsdcForm.get("taiSans").setValue(taisansSelected);
  }
  onSubmit(value:any){
    this.submitted=true;
    const taisansSelected= this.taiSans.filter(x=>x.checked===true);
    this.dsdcForm.get("taiSans").setValue(taisansSelected);
    if(taisansSelected.length>0){


      if(this.dsdcForm.valid){

        this.ttdcService.addTTDC(value).pipe(
          catchError(()=>{
            this.toastr.error("Thêm không thành công ");
            throw new Error("Thêm không thành công")
          }
          )
        ).subscribe(data=>{
          if(data){
            this.toastr.success("Thêm thành công");
            taisansSelected.map(taisan=>{
              this.taisanService.dichuyenTS(taisan.maTS,value.maPhongDC).subscribe(data=>{
                this.taisans$= this.taisanService.getTaiSanByPhong(0,10,value.maPhong);
                this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)
              });
            })
            const thongBao:ThongBao=new ThongBao();
            thongBao.noiDung=value.user.username+" đã lập 1 thông tin di chuyển";
            thongBao.maTTDC=data.maTTDC;
            thongBao.maTTSua=0;
            thongBao.maNguoiGui=value.user.id;
            thongBao.maNguoiNhan=11;
            this.thongbaoService.addThongBao(thongBao).subscribe(data => {console.log(data);});

          }
          else
          this.toastr.error("Thêm không thành công");

        });

      }else{
        this.toastr.error("Các trường không được để trống")
      }
    }else{
      this.toastr.error("Bạn phải chọn tài sản cần di chuyển")

    }





  }

}

import { TtsService } from './../../services/tts.service';
import { TaisanService } from './../../services/taisan.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Phong } from 'src/app/models/Phong';
import { TaiSan } from 'src/app/models/TaiSan';
import { PhongService } from 'src/app/services/phong.service';
import { TtdcService } from 'src/app/services/ttdc.service';
import { UserService } from 'src/app/services/user.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ThongBao } from 'src/app/models/ThongBao';

@Component({
  selector: 'app-lap-thong-tin-sua',
  templateUrl: './lap-thong-tin-sua.component.html',
  styleUrls: ['./lap-thong-tin-sua.component.css']
})
export class LapThongTinSuaComponent {
  taisans$:Observable<ApiResponse<TaiSan>>;
  phongs$:Observable<Phong[]>;
  taiSans:TaiSan[];
  submitted:boolean=false;
  dsdcForm:FormGroup;


  constructor(private TaisanService:TaisanService,private router:Router,private toastr:ToastrService,private ttsService:TtsService,private thongbaoService:ThongbaoService,
    private phongService:PhongService,private fb:FormBuilder,private ttdcService:TtdcService,private userService:UserService) {

  }
  ngOnInit(): void {

    this.userService.currentUser$.subscribe(user => {
      this.dsdcForm=this.fb.group({
        maPhong:new FormControl("",Validators.required),
        chiPhi:new FormControl("",[Validators.required,Validators.pattern("^[1-9]\d*$")]),
        phong:new FormControl("",Validators.required),
        tenTTSua:new FormControl("",Validators.required),
        moTa:new FormControl("",Validators.required),
        taiSans:new FormControl([],Validators.required),
        user:new FormControl(user,Validators.required)
      })
    })
    this.taisans$=this.TaisanService.getTaiSanByPhongAndTT(0,10,2);
    this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)
    this.phongs$=this.phongService.getAllPhong();




  }
  checkAllCheckBox(ev: any) {
		this.taiSans.forEach(x => x.checked = ev.target.checked)
    const taisansSelected= this.taiSans.filter(x=>x.checked===true);
    this.dsdcForm.get("taiSans").setValue(taisansSelected);
	}
  isAllCheckBoxChecked() {
		return this.taiSans.every(p => p.checked);
	}
  goToPage(page:number){
    this.taisans$=this.TaisanService.getTaiSans(page,10);
    this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)


  }
  phongFromChange(maPhong:any){
    this.phongs$.subscribe(phongs=>{
      const phong=phongs.find(x=>x.maPhong==maPhong);
      this.dsdcForm.get("phong").setValue(phong);
    })
    this.taisans$= this.TaisanService.getTaiSanByPhongAndTT(0,10,maPhong);
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

        this.ttsService.addTTS(value).pipe(
          catchError(()=>{
            this.toastr.error("Thêm không thành công ");
            throw new Error("Thêm không thành công")
          }
          )
        ).subscribe(data=>{
          if(data){
            this.toastr.success("Thêm thành công");
            taisansSelected.map(taisan=>{
              taisan.trangThai={maTT:1,tenTT:"đang được sử dụng"};
              this.TaisanService.updateTS(taisan).subscribe(data=>{

              });
            })
            const thongBao:ThongBao=new ThongBao();
            thongBao.noiDung=value.user.username+" đã lập 1 thông tin di sửa";
            thongBao.maTTDC=0;
            thongBao.maTTSua=data.maTTSua;
            thongBao.maNguoiGui=value.user.id;
            thongBao.maNguoiNhan=11;
            this.thongbaoService.addThongBao(thongBao).subscribe(data => {console.log(data);});

          }
          else
          this.toastr.error("Thêm không thành công");

        });

      }
    }else{
      this.toastr.error("Bạn phải chọn tài sản cần sửa")

    }





  }

}

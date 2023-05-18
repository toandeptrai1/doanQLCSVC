import { ThanhlyService } from './../../services/thanhly.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, forkJoin } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { TaiSan } from 'src/app/models/TaiSan';
import { PhongService } from 'src/app/services/phong.service';
import { TaisanService } from 'src/app/services/taisan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lap-dsthanh-ly',
  templateUrl: './lap-dsthanh-ly.component.html',
  styleUrls: ['./lap-dsthanh-ly.component.css']
})
export class LapDSThanhLyComponent implements OnInit{
  taisans$:Observable<ApiResponse<TaiSan>>;

  taiSans:TaiSan[];
  submitted:boolean=false;

  dsdcForm:FormGroup;


  constructor(private TaisanService:TaisanService,private router:Router,private toastr:ToastrService,
    private phongService:PhongService,private fb:FormBuilder,private thanhLyService:ThanhlyService,private userService:UserService) {

  }
  ngOnInit(): void {

    this.userService.currentUser$.subscribe(user => {
      this.dsdcForm=this.fb.group({
        tenThanhLy:new FormControl("",Validators.required),
        tienThu:new FormControl("",Validators.required),
        coQuanTL:new FormControl("",Validators.required),
        moTa:new FormControl("",Validators.required),
        taiSans:new FormControl([],Validators.required),
        user:new FormControl(user,Validators.required)
      })
    })
    this.taisans$=this.TaisanService.getTaiSanByPhong(0,10,6);
    this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)





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
    this.taisans$=this.TaisanService.getTaiSanByPhong(page,10,6);
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

        this.thanhLyService.addTTTL(value).pipe(
          catchError(()=>{
            this.toastr.error("Thêm không thành công ");
            throw new Error("Thêm không thành công")
          }
          )
        ).subscribe(data=>{
          if(data){
            const listUpdateTS$:Observable<boolean>[]=[];
            this.toastr.success("Thêm thành công");
            taisansSelected.map(taisan=>{
              taisan.trangThai={maTT:7,tenTT:"đã được thanh lý"};
              listUpdateTS$.push(this.TaisanService.updateTS(taisan))

            })
            forkJoin(listUpdateTS$).subscribe(data=>{
              this.taisans$=this.TaisanService.getTaiSanByPhong(0,10,6);
               this.taisans$.subscribe(taiSans=>this.taiSans=taiSans.data.page.content)

            })

          }
          else
          this.toastr.error("Thêm không thành công");

        });

      }
    }else{
      this.toastr.error("Bạn phải chọn tài sản cần thanh lý")

    }





  }

}

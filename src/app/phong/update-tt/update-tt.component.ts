import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concat, forkJoin } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Phong } from 'src/app/models/Phong';
import { TaiSan } from 'src/app/models/TaiSan';
import { TrangThai } from 'src/app/models/TrangThai';
import { PhongService } from 'src/app/services/phong.service';
import { TaisanService } from 'src/app/services/taisan.service';

@Component({
  selector: 'app-update-tt',
  templateUrl: './update-tt.component.html',
  styleUrls: ['./update-tt.component.css']
})
export class UpdateTTComponent implements OnInit {
  taisans$:Observable<ApiResponse<TaiSan>>;
  phong$:Observable<Phong>;
  taiSans:TaiSan[];

  maPhong:number;
  trangThais$:Observable<TrangThai[]>;
  trangThai:TrangThai;
  updateForm:FormGroup;
  updateTSArray$:Observable<boolean>[]=[];


  submmited:boolean=false;


  constructor(private phongService:PhongService,private route:ActivatedRoute,
    private taisanService:TaisanService,private router:Router,private fb:FormBuilder,private toastr:ToastrService) {

  }



  ngOnInit(): void {
    this.updateForm=this.fb.group({
      maTT:new FormControl("",Validators.required)
    })

    this.trangThais$=this.phongService.getTrangThais();
    this.route.params.subscribe(params =>this.maPhong=params['id']);
    this.phong$=this.phongService.getPhong(this.maPhong);

    this.taisans$=this.taisanService.getTaiSanByPhong(0,10,this.maPhong);
    this.taisans$.subscribe(taiSans =>{this.taiSans=taiSans.data.page.content;

    });


  }
  checkAllCheckBox(ev: any) {
		this.taiSans.forEach(x => x.checked = ev.target.checked)
	}
  isAllCheckBoxChecked() {
		return this.taiSans.every(p => p.checked);
	}
  goToPage(page:number){
    this.taisans$=this.taisanService.getTaiSanByPhong(page,10,this.maPhong);

  }

  onTTChange(maTT:any){
   this.trangThais$.subscribe(trangThais=>{
    this.trangThai=trangThais.find(x=>x.maTT==maTT);

   })

  }
  updateTTTS(value:any){
    this.submmited=true;
    const taisansSelected= this.taiSans.filter(x=>x.checked===true);


    if(this.updateForm.valid&&taisansSelected.length>0){
      taisansSelected.map(taisan=>{
        taisan.trangThai=this.trangThai;
        this.updateTSArray$.push(this.taisanService.updateTS(taisan));


      })
      forkJoin(this.updateTSArray$).subscribe(data=>{
        console.log(data);
        this.router.navigateByUrl(`/QLCSVC/phong/chitietphong/${this.maPhong}`)

      })








    }else{
      this.toastr.error("Bạn phải chọn tài sản cần cập nhật trạng thái")

    }
  }

}

import { ActivatedRoute, Router } from '@angular/router';
import { PhongService } from 'src/app/services/phong.service';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Phong } from 'src/app/models/Phong';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { TrangThai } from 'src/app/models/TrangThai';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { TaiSan } from 'src/app/models/TaiSan';
import { TaisanService } from 'src/app/services/taisan.service';
import { DanhMucPhong } from 'src/app/models/DanhMucPhong';

@Component({
  selector: 'app-edit-phong',
  templateUrl: './edit-phong.component.html',
  styleUrls: ['./edit-phong.component.css']
})
export class EditPhongComponent implements OnInit {
  phong$:Observable<Phong>;
  maPhong:number;
  editForm:FormGroup;
  file:File;
  trangThais$:Observable<TrangThai[]>;
  taisans$:Observable<ApiResponse<TaiSan>>;
  danhMucPhongs$:Observable<DanhMucPhong[]>;



  constructor(private phongService:PhongService,private fileService:FileService,private router:Router
    ,private route:ActivatedRoute,private fb:FormBuilder,private toastService:ToastrService,private taisanService:TaisanService){


  }
  ngOnInit(): void {
    this.taisans$=this.taisanService.getTaiSans(0,5);
    this.trangThais$=this.phongService.getTrangThais();

    this.danhMucPhongs$=this.phongService.getDanhMucPhongs();

    this.route.params.subscribe(params =>this.maPhong=params['maPhong']);
    this.phong$=this.phongService.getPhong(this.maPhong);
    this.phong$.subscribe(phong=>{
       this.editForm = this.fb.group({
        maPhong:new FormControl(phong.maPhong,Validators.required),
        tenPhong:new FormControl(phong.tenPhong,Validators.required),
        chieuDai:new FormControl(phong.chieuDai,Validators.required),
        chieuRong:new FormControl(phong.chieuRong,Validators.required),
        mota:new FormControl(phong.mota,Validators.required),
        image:new FormControl(phong.image,Validators.required),
        vitri:new FormControl(phong.vitri,Validators.required),
        trangThai:this.fb.group({maTT:phong.trangThai.maTT,tenTT:phong.trangThai.tenTT}),
        danhMucPhong:this.fb.group({maDanhMucPhong:phong.danhMucPhong.maDanhMucPhong,tenDanhMucPhong:phong.danhMucPhong.tenDanhMucPhong})

      });

    })

  }
  editTrangThai(value:any){
    this.trangThais$.subscribe(data=>{
      let trangThai=data.find(x=>x.maTT==value);
      this.editForm.get('trangThai').setValue(trangThai);

    }
    )

  }
  editDanhMucPhong(maDMP:any){
    let danhMucPhong:DanhMucPhong;
    this.danhMucPhongs$.subscribe(danhMucPhongs=>{
      danhMucPhong = danhMucPhongs.find(x=>x.maDanhMucPhong==maDMP);
      this.editForm.get("danhMucPhong").setValue({maDanhMucPhong:danhMucPhong.maDanhMucPhong,tenDanhMucPhong:danhMucPhong.tenDanhMucPhong});

    })

  }
  onFileChange(file:any){
    this.file=file.files[0];
    this.editForm.get('image').setValue(file.files[0].name);
  }
  onSubmit(value:Phong){

    if(this.editForm.valid){
      this.fileService.upload(this.file).subscribe(()=>console.log("upload successful!"));
      this.phongService.updatePhong(value).pipe(
        catchError(()=>{
          this.toastService.error("Sửa không thành công");
          throw new Error("Sửa không thành công")
        })

      ).subscribe((data)=>{
        this.phong$=this.phongService.getPhong(this.maPhong);
        this.toastService.success("Sửa thành công")
      })

    }

  }



}

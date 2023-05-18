import { FileService } from './../../services/file.service';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from './../../services/taisan.service';
import { PhongService } from './../../services/phong.service';
import { Phong } from 'src/app/models/Phong';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, catchError } from 'rxjs';
import { DanhMucTaiSan } from 'src/app/models/DanhMucTaiSan';
import { TrangThai } from 'src/app/models/TrangThai';
import { TaiSan } from 'src/app/models/TaiSan';

@Component({
  selector: 'app-add-tai-san',
  templateUrl: './add-tai-san.component.html',
  styleUrls: ['./add-tai-san.component.css']
})
export class AddTaiSanComponent implements OnInit {
  addForm:FormGroup;
  danhMucTS$:Observable<DanhMucTaiSan[]>;
  trangThai$:Observable<TrangThai[]>;
  phong$:Observable<Phong[]>;
  file:File;

  constructor(private taiService:TaisanService,private fb:FormBuilder
    ,private phongService:PhongService,private toastr:ToastrService,private fileService:FileService) {

  }
  ngOnInit(){
    this.phong$=this.phongService.getAllPhong();
    this.trangThai$=this.phongService.getTrangThais();
    this.danhMucTS$=this.taiService.getDanhMucs();
    this.addForm = this.fb.group({

      tenTS:new FormControl("",Validators.required),
      namSanXuat:new FormControl("",Validators.required),
      hangSanXuat:new FormControl("",Validators.required),
      image:new FormControl("",Validators.required),
      imageQR:new FormControl(""),
      boNho:new FormControl(""),
      viSuLy:new FormControl(""),
      boMachChu:new FormControl(""),
      cacXuLyDoHoa:new FormControl(""),
      khac:new FormControl(""),
      congXuat:new FormControl(""),
      maPhong:new FormControl(""),
      trangThai:this.fb.group({maTT:["",Validators.required],tenTT:["",Validators.required]}),
      danhMucTaiSan:this.fb.group({
        maDanhMucTS:["",Validators.required],
        tenDanhMucTS:["",Validators.required],
      }),
    })

  }
  onFileChange(file:any){
    this.file=file.files[0];
    this.addForm.get('image').setValue(file.files[0].name);

  }
  onTTChange(value:any){

    this.trangThai$.subscribe(data=>{
      let trangThai=data.find(x=>x.maTT==value);
      this.addForm.get('trangThai').setValue({maTT:trangThai.maTT,tenTT:trangThai.tenTT})
    })
  }
  onDMTSChange(value:any){

    let dmts;
    this.danhMucTS$.subscribe(data=>{
      dmts=data.find(x=>x.maDanhMucTS==value);
      this.addForm.get('danhMucTaiSan').setValue({
        maDanhMucTS:dmts.maDanhMucTS,
        tenDanhMucTS:dmts.tenDanhMucTS,
      })
    })
  }
  onSubmit(taisan:TaiSan){

    if(this.addForm.valid){
      this.fileService.upload(this.file).subscribe(
        ()=>console.log("upload thanh cong")
      )
      this.taiService.addTS(taisan).pipe(
        catchError(()=>{
          this.toastr.error("Thêm không thành công")
          throw new Error("Thêm không thành công")
        })
      ).subscribe(data =>{
        this.toastr.success("Thêm thành công");

      })
    }else{
      this.toastr.error("Các trường không được để trống")
    }
  }




}

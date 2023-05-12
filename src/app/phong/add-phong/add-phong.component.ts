import { ToastrService } from 'ngx-toastr';
import { TrangThai } from './../../models/TrangThai';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { Phong } from 'src/app/models/Phong';
import { PhongService } from 'src/app/services/phong.service';
import { FileService } from 'src/app/services/file.service';
import { DanhMucPhong } from 'src/app/models/DanhMucPhong';

@Component({
  selector: 'app-add-phong',
  templateUrl: './add-phong.component.html',
  styleUrls: ['./add-phong.component.css']
})
export class AddPhongComponent implements OnInit {
  addForm: FormGroup;
  file:File;
  trangThais$:Observable<TrangThai[]>;
  danhMucPhongs$:Observable<DanhMucPhong[]>;

  constructor(private phongService: PhongService,private fb: FormBuilder,private toastr:ToastrService,private fileService:FileService){

  }
  ngOnInit(): void {
    this.trangThais$=this.phongService.getTrangThais();
    this.danhMucPhongs$=this.phongService.getDanhMucPhongs();

    this.addForm=this.fb.group({

     tenPhong:new FormControl("",Validators.required),
     chieuDai:new FormControl("",Validators.required),
     chieuRong:new FormControl("",Validators.required),
     mota:new FormControl("",Validators.required),
     vitri:new FormControl("",Validators.required),
     image:new FormControl("",Validators.required),
     trangThai:this.fb.group({maTT:"",tenTT:""}),
     danhMucPhong:this.fb.group({maDanhMucPhong:"",tenDanhMucPhong:""})

    });


  }
  fileChange(file:any){
    this.file=file.files[0];
    this.addForm.get("image").setValue(file.files[0].name);
  }
  editTrangThai(value:any){
    let trangThai;
    this.trangThais$.subscribe(trangThais=>{
      trangThai = trangThais.find(trangThai=>trangThai.maTT==value);
      this.addForm.get("trangThai").setValue({maTT:trangThai.maTT,tenTT:trangThai.tenTT});
    })

  }
  editDanhMucPhong(maDMP:any){
    let danhMucPhong:DanhMucPhong;
    this.danhMucPhongs$.subscribe(danhMucPhongs=>{
      danhMucPhong = danhMucPhongs.find(x=>x.maDanhMucPhong==maDMP);
      this.addForm.get("danhMucPhong").setValue({maDanhMucPhong:danhMucPhong.maDanhMucPhong,tenDanhMucPhong:danhMucPhong.tenDanhMucPhong});

    })

  }
  onSubmit(value:Phong){
    if(this.addForm.valid){
      this.fileService.upload(this.file).subscribe(data=>console.log(data));
      this.phongService.addPhong(value).pipe(
        catchError(()=>{
          this.toastr.error("Thêm không thành công");
          throw new Error("Thêm không thành công")
        })
      ).subscribe(data=>{
        this.toastr.success("Thêm thành công!");
      })

    }

  }




}

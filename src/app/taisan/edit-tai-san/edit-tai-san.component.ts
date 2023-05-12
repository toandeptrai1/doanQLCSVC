import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { DanhMucTaiSan } from 'src/app/models/DanhMucTaiSan';
import { Phong } from 'src/app/models/Phong';
import { TaiSan } from 'src/app/models/TaiSan';
import { TrangThai } from 'src/app/models/TrangThai';
import { FileService } from 'src/app/services/file.service';
import { PhongService } from 'src/app/services/phong.service';
import { TaisanService } from 'src/app/services/taisan.service';

@Component({
  selector: 'app-edit-tai-san',
  templateUrl: './edit-tai-san.component.html',
  styleUrls: ['./edit-tai-san.component.css']
})
export class EditTaiSanComponent implements OnInit {


  editForm:FormGroup;
  taisan:TaiSan;
  danhMucTS$:Observable<DanhMucTaiSan[]>;
  trangThai$:Observable<TrangThai[]>;
  phong$:Observable<Phong[]>;
  file:File;
  maTS:number;

  constructor(private taiService:TaisanService,private fb:FormBuilder
    ,private phongService:PhongService,private toastr:ToastrService,private fileService:FileService,private route:ActivatedRoute) {

  }
  ngOnInit(){
    this.route.params.subscribe(params =>this.maTS=params['id'])
    this.phong$=this.phongService.getAllPhong();
    this.trangThai$=this.phongService.getTrangThais();
    this.danhMucTS$=this.taiService.getDanhMucs();
    this.taiService.getTS(this.maTS).subscribe(taisan=>{
      this.taisan=taisan;
      this.editForm = this.fb.group({
        maTS:new FormControl(taisan.maTS,Validators.required),
        tenTS:new FormControl(taisan.tenTS,Validators.required),
        namSanXuat:new FormControl(taisan.namSanXuat,Validators.required),
        hangSanXuat:new FormControl(taisan.hangSanXuat,Validators.required),
        image:new FormControl(taisan.image,Validators.required),
        imageQR:new FormControl(taisan.imageQR),
        boNho:new FormControl(taisan.boNho),
        viSuLy:new FormControl(taisan.viSuLy),
        boMachChu:new FormControl(taisan.boMachChu),
        cacXuLyDoHoa:new FormControl(taisan.cacXuLyDoHoa),
        khac:new FormControl(taisan.khac),
        congXuat:new FormControl(taisan.congXuat),
        maPhong:new FormControl(taisan.phong.maPhong),
        trangThai:this.fb.group({maTT:[taisan.trangThai.maTT,Validators.required],tenTT:[taisan.trangThai.tenTT,Validators.required]}),
        danhMucTaiSan:this.fb.group({
          maDanhMucTS:[taisan.danhMucTaiSan.maDanhMucTS,Validators.required],
          tenDanhMucTS:[taisan.danhMucTaiSan.tenDanhMucTS,Validators.required],
        }),
      })

    })


  }
  onFileChange(file:any){
    this.file=file.files[0];
    this.editForm.get('image').setValue(file.files[0].name);

  }
  onTTChange(value:any){

    this.trangThai$.subscribe(data=>{
      let trangThai=data.find(x=>x.maTT==value);
      this.editForm.get('trangThai').setValue({maTT:trangThai.maTT,tenTT:trangThai.tenTT})
    })
  }
  onDMTSChange(value:any){

    let dmts;
    this.danhMucTS$.subscribe(data=>{
      dmts=data.find(x=>x.maDanhMucTS==value);
      this.editForm.get('danhMucTaiSan').setValue({
        maDanhMucTS:dmts.maDanhMucTS,
        tenDanhMucTS:dmts.tenDanhMucTS,
      })
    })
  }
  onSubmit(taisan:TaiSan){

    if(this.editForm.valid){
      this.fileService.upload(this.file).subscribe(
        ()=>console.log("upload thanh cong")
      )
      this.taiService.updateTS(taisan).pipe(
        catchError(()=>{
          this.toastr.error("Sửa không thành công")
          throw new Error("Sửa không thành công")
        })
      ).subscribe(data =>{
        this.taiService.getTS(this.maTS).subscribe(taisan=>this.taisan=taisan)
        this.toastr.success("Sửa thành công");

      })
    }
  }




}

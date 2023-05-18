import { UserService } from 'src/app/services/user.service';
import { Role } from './../../models/Role';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { User } from 'src/app/models/User';
import { FileService } from 'src/app/services/file.service';
import { ToastrService } from 'ngx-toastr';
import { ChucVu } from 'src/app/models/ChucVu';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  editForm:FormGroup;
  rolesSubject: BehaviorSubject<Role>;
  roles$:Observable<Role[]>;
  file:File;
  submited: boolean=false;
  chucVus$:Observable<ChucVu[]>;
  constructor(private fb: FormBuilder,private userService:UserService,private fileService:FileService,
    private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.chucVus$=this.userService.getChucVu();
    this.roles$=this.userService.getRoles();
    this.editForm =this.fb.group({
      name:new FormControl("",Validators.required),
      username:new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required),
      chucVu:this.fb.group({maChucVu:"",tenChucVu:""}),
      email:new FormControl("",[Validators.required,Validators.email]),
      diachi:new FormControl("",Validators.required),
      tuoi:new FormControl("",[Validators.required,Validators.pattern("^[1-9]\d*$")]),
      password:new FormControl("",Validators.required),
      image:"",
      roles:this.fb.array([this.initRole()]),
      phongs:this.fb.array([])

    })



  }
  getControls() {
    return (this.editForm.get('roles') as FormArray).controls;
  }
  initRole(){
    return this.fb.group({id:"",name:""});
  }
  initPhong(){
    return this.fb.group({id:"",name:""})
  }
  addNewRole(){
    const add=this.editForm.controls['roles'] as FormArray;
    add.push(this.fb.group({id:"",name:""}))

  }
  editRole(index:number,id:string){
    const add=this.editForm.controls['roles'] as FormArray;
    this.roles$.subscribe(data=>{
      let role=data.find(role=>role.id==parseInt(id));
      add.setControl(index,this.fb.group({id:role.id,name:role.name}))
    })
  }
  removeBtnDelete(index:number){
    const add=this.editForm.controls['roles'] as FormArray;
    add.removeAt(index);


  }
  chucVuChange(maChucVu:any){
     this.chucVus$.subscribe(chucVus=>{
        let chucVu:ChucVu;
        chucVu=chucVus.find(x=>x.maChucVu==maChucVu)
        this.editForm.get("chucVu").setValue({maChucVu:chucVu.maChucVu,tenChucVu:chucVu.tenChucVu});
     })

  }
  onFileChange(file:any){
    this.file=file.files[0];
    this.editForm.controls["image"].setValue(file.files[0].name);

  }
  addUser(user:User){
    this.submited=true;
    if(this.editForm.valid){
      this.fileService.upload(this.file).subscribe(data =>console.log(data));
      this.userService.addUser(user).pipe(
        catchError(()=>{
          this.toastr.error("Thêm không thành công")
          throw new Error("Thêm không thành công");

        })
      ).subscribe(user=>{
        this.toastr.success("Thêm thành công");
      })
    }


  }


}

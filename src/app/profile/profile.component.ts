import { FileService } from './../services/file.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$:Observable<User>;
  userSubject:BehaviorSubject<User>;
  user:User;
  username:string;
  editProfileForm:FormGroup;
  changePasswordForm:FormGroup;
  file:File;
  fileNameSubject:BehaviorSubject<string>;
  fileName$:Observable<string>;
  submited:boolean = false;
  token:any;

  constructor(private userService:UserService,private toastr:ToastrService,private fileService:FileService,private formBuilder: FormBuilder){


  }
  ngOnInit(): void {
    this.token=JSON.parse(localStorage.getItem("token"));
    this.userSubject=new BehaviorSubject<User>(null);
    this.user$=this.userSubject.asObservable();
    this.username=JSON.parse(localStorage.getItem("token"))?.username;

    this.changePasswordForm=this.formBuilder.group({
      password:new FormControl("",Validators.required),
      newPassword:new FormControl("",Validators.required),
      rePassword:new FormControl("",Validators.required)
    },{validator:PasswordValidator('newPassword','rePassword')})


    this.userService.getUser(this.username).subscribe(user =>{
      this.user=user;
      this.userSubject.next(user);

      this.editProfileForm=this.formBuilder.group({
        name:new FormControl(user.name,Validators.required),
        username:new FormControl(user.username,Validators.required),
        email:new FormControl(user.email,Validators.required),
        phone:new FormControl(user.phone,Validators.required),
        tuoi:new FormControl(user.tuoi,Validators.required),
        diachi:new FormControl(user.diachi,Validators.required),
        image:new FormControl(user.image,Validators.required),
        chucVu: this.formBuilder.group({maChucVu:user.chucVu.maChucVu,tenChucVu:user.chucVu.tenChucVu}),
        id:new FormControl(user.id,Validators.required)

      })
    })


  }
  onFileChange(file:any) {
   this.file=file.files[0];
   this.editProfileForm.controls["image"].setValue(file.files[0].name);

   console.log(this.editProfileForm.controls["image"].getRawValue());


  }
  onSubmit(value:any) {

    if(this.editProfileForm.valid){
     this.fileService.upload(this.file).subscribe(data => {console.log(data);});
     this.userSubject.next(value);
     this.userService.currentUserSub.next(value);

     this.userService.updateUser(value).subscribe(data => {
      if(data){

        this.userService.currentUserSub.next(value);
        this.toastr.success("Sửa thành công ");


      }

      else
        this.toastr.error("Sửa không thành công")
     });



    }
  }
  changePassSubmit(value:any){
    this.submited=true;
    if(this.changePasswordForm.valid){
      this.userService.changePassword(this.user.id,value?.password,value?.newPassword).pipe(
        catchError(()=>{
          this.toastr.error("Sửa không thành công password nhập vào không chính xác");
          throw new Error("Co loi roi")
        })
      ).subscribe(
        response=>{
          if(response){
            this.toastr.success("Sửa thành công.");
          }else{
            this.toastr.error("Sửa không thành công password nhập vào không chính xác");
          }

        }
      )

    }


  }


}

import { PhongService } from './../../services/phong.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Phong } from 'src/app/models/Phong';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-phan-cong-ql',
  templateUrl: './phan-cong-ql.component.html',
  styleUrls: ['./phan-cong-ql.component.css']
})
export class PhanCongQLComponent {
  Users$: Observable<ApiResponse<User>>;
  phongs$:Observable<Phong[]>
  phongSelecForm:FormGroup;
  currentUser$:Observable<User>;
  user:User;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private phongService:PhongService,
    private fb:FormBuilder
  ) {}
  ngOnInit(): void {
    this.currentUser$=this.userService.getUser(JSON.parse(localStorage.getItem("token")).username);
    this.currentUser$.subscribe(data => {this.user=data});

    this.phongSelecForm=this.fb.group({
      phongSelected:new FormControl("",Validators.required)

    })
    this.Users$ = this.userService.getUsers();
    this.phongs$=this.phongService.getAllPhong();

  }

  isTruongKhoa(user:User):boolean {
    return user?.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');

  }
  isGiangVien(user:User):boolean {
    return user?.roles.some(role => role.name === 'ROLE_USER');

  }

  navigateToPhongDetail(id:number){
    this.router.navigateByUrl(`/QLCSVC/phong/chitietphong/${id}`);

  }

  onSubmit(value:any,id:any) {
    if(this.phongSelecForm.valid) {
        this.userService.addPhongToUser(id,value.phongSelected).pipe(
          catchError(()=>{
            this.toastr.error("Thêm phòng không thành công")
            throw new Error("Thêm phòng không thành công")
          }
          )
        ).subscribe(result => {
          this.Users$ = this.userService.getUsers();
          this.toastr.success("Thêm thành công")
        })
    }

  }
  deletePhongFormUser(id:number,maPhong:number){
    this.userService.removePhongFormUser(id,maPhong).pipe(
      catchError(()=>{
        this.toastr.error("Xóa phòng không thành công")
        throw new Error("Xóa phòng không thành công")
      }
      )
    ).subscribe(result => {
      this.Users$ = this.userService.getUsers();
      this.toastr.success("Xóa thành công")
    })

  }

}

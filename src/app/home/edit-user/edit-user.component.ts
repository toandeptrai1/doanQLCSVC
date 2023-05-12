import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChucVu } from 'src/app/models/ChucVu';
import { User } from 'src/app/models/User';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  user$: Observable<User>;
  userSubject: BehaviorSubject<User>;
  user: User;
  username: string;
  editProfileForm: FormGroup;

  file: File;
  fileNameSubject: BehaviorSubject<string>;
  fileName$: Observable<string>;
  submited: boolean = false;
  chucVus$:Observable<ChucVu[]>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.chucVus$=this.userService.getChucVu();
    this.userSubject = new BehaviorSubject<User>(null);
    this.user$ = this.userSubject.asObservable();
    this.activedRoute.params.subscribe(
      (params) => (this.username = params['username'])
    );

    this.userService.getUser(this.username).subscribe((user) => {
      this.user = user;
      this.userSubject.next(user);

      this.editProfileForm = this.formBuilder.group({
        name: new FormControl(user.name, Validators.required),
        username: new FormControl(user.username, Validators.required),
        email: new FormControl(user.email, Validators.required),
        phone: new FormControl(user.phone, Validators.required),
        tuoi: new FormControl(user.tuoi, Validators.required),
        diachi: new FormControl(user.diachi, Validators.required),
        image: new FormControl(user.image, Validators.required),
        chucVu: this.formBuilder.group({maChucVu:user.chucVu.maChucVu,tenChucVu:user.chucVu.tenChucVu}),
        id: new FormControl(user.id, Validators.required),
      });
    });
  }
  chucVuChange(maChucVu:any){
    this.chucVus$.subscribe(chucVus=>{
       let chucVu:ChucVu;
       chucVu=chucVus.find(x=>x.maChucVu==maChucVu)
       this.editProfileForm.get("chucVu").setValue({maChucVu:chucVu.maChucVu,tenChucVu:chucVu.tenChucVu});
    })

 }
  onFileChange(file: any) {
    this.file = file.files[0];
    this.editProfileForm.controls['image'].setValue(file.files[0].name);

    console.log(this.editProfileForm.controls['image'].getRawValue());
  }
  onSubmit(value: any) {
    if (this.editProfileForm.valid) {
      this.fileService.upload(this.file).subscribe((data) => {
        console.log(data);
      });

      this.userService.updateUser(value).subscribe((data) => {
        if (data) {
          this.toastr.success('Sửa thành công ');
        } else this.toastr.error('Sửa không thành công');
      });
    }
  }
}

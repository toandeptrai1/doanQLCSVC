import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted:boolean = false;
  constructor(private userService: UserService,private router:Router,private toastr: ToastrService ) {


  }
  ngOnInit(): void {
    this.signinForm=new FormGroup({
      username:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required)

    })


  }
  public login(value:any) {
    this.submitted=true;
   if(this.signinForm.valid){
    this.userService.login(value?.username,value?.password).pipe(
      catchError(() => {
        this.toastr.error("Login Failed! Please try again");
        throw new Error('login faild!')
    })
    )
    .subscribe(data=>{
        this.userService.getUser(data.username).subscribe(user=>{this.userService.currentUserSub.next(user)});

        this.router.navigateByUrl("QLCSVC");



    })
   }

  }

}

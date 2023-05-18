import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Users$: Observable<ApiResponse<User>>;
  currentUser$:Observable<User>;
  user:User;
  currentPageSubject=new BehaviorSubject<number>(0);
  currenPage$=this.currentPageSubject.asObservable();
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.Users$ = this.userService.getUsers(0,3).pipe(map(response=>{
      this.currentPageSubject.next(response.data.page.number);
      return response;
    }));
    this.currentUser$=this.userService.getUser(JSON.parse(localStorage.getItem("token")).username);
    this.currentUser$.subscribe(data => {this.user=data});

  }
  isTruongKhoa():boolean {
    return this.user.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');

  }
  deleteUser(id: number) {
    this.userService
      .deleteUser(id)
      .pipe(
        catchError(() => {
          this.toastr.error('Xóa không thành công');
          throw new Error('Xóa không thành công');
        })
      )
      .subscribe((res) => {
        this.toastr.success('Xóa thành công');
        this.Users$ = this.userService.getUsers();
      });
  }
  goToPage(page:number){
    this.Users$ = this.userService.getUsers(page,3).pipe(map(response=>{
      this.currentPageSubject.next(response.data.page.number);
      return response;
    }));;


  }
}

import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Users$: Observable<ApiResponse<User>>;
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.Users$ = this.userService.getUsers();
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
}

import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser$:Observable<User>;
  user:User;
  roleTK:Role;
  constructor(private userService: UserService){

  }

  ngOnInit(): void {


    this.currentUser$=this.userService.getUser(JSON.parse(localStorage.getItem("token")).username);
    this.currentUser$.subscribe(data => {this.user=data});




  }
  isQuanLy():boolean {
    return this.user?.roles.some(role => role.name === 'ROLE_ADMIN');
  }
  isTruongKhoa():boolean {
    return this.user?.roles.some(role => role.name === 'ROLE_SUPER_ADMIN');

  }



}

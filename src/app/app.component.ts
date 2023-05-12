import { Component, NgModule, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QLCSVC';
  userLogin:any;
  constructor(private userService: UserService){


  }
  ngOnInit() {
    this.userService.User$.subscribe(user =>this.userLogin=user);




  }

}

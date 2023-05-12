import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{


  user$:Observable<User>;

  constructor(private userService: UserService,private router:Router){

  }


  ngOnInit(): void {
    this.userService.getUser(JSON.parse(localStorage.getItem("token"))?.username)
    .subscribe(user =>this.userService.currentUserSub.next(user));

    this.user$=this.userService.currentUser$;



  }
  public signOut(){
    this.userService.logout();
    this.router.navigateByUrl("/QLCSVC/login")
  }

}

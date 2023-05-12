import { Page } from './../models/Page';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';
import { Role } from '../models/Role';
import { ChucVu } from '../models/ChucVu';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  User:BehaviorSubject<any>;
  User$:Observable<any>;
  currentUserSub=new BehaviorSubject<User>(null);
  currentUser$:Observable<User>;

  constructor(private http:HttpClient) {
    this.User=new BehaviorSubject<any>(JSON.parse(localStorage.getItem("token")));
    this.User$=this.User?.asObservable();
    this.currentUser$=this.currentUserSub.asObservable();





  }



  public login(username:string, password:string):Observable<any>{
    return this.http.post(`http://localhost:8080/QLCSVC/auth/login`,{username:username,password:password}).pipe(

      map(response => {
        localStorage.setItem("token",JSON.stringify(response));
        this.User.next(response);

        return response;
      })
    );

  }
  public getUser(username:string):Observable<User> {


    return this.http.get<User>(`http://localhost:8080/QLCSVC/api/user/getUser/${username}`);

  }
  public getUsers(page:number=0,size:number=4): Observable<ApiResponse<User>>{
    return this.http.post<ApiResponse<User>>("http://localhost:8080/QLCSVC/api/user/getAll",{page,size});
  }
  public updateUser(user: User):Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8080/QLCSVC/api/user/update",user);
  }
  public logout(){
    localStorage.removeItem("token");
    this.User.next(null);
  }
  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>("http://localhost:8080/QLCSVC/api/user/roles");

  }
  public getJwtToken(){
    return this.User.value?.authenticationToken;
  }
  public addUser(user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8080/QLCSVC/api/user/add",user);

  }
  public deleteUser(id:number):Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8080/QLCSVC/api/user/delete",id);
  }
  public changePassword(userID:number,password:string,newPassword:string):Observable<boolean>{

    return this.http.post<boolean>("http://localhost:8080/QLCSVC/api/user/changePassword",{userID:userID,password:password,newPassword:newPassword});

  }

  public getChucVu():Observable<ChucVu[]>{
    return this.http.get<ChucVu[]>("http://localhost:8080/QLCSVC/api/user/chucvus")
  }
}

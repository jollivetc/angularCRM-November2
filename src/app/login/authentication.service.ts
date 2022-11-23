import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from './model/user';

const KEY_USER = 'angular.crm.user';
const KEY_TOKEN = 'angular.crm.token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUser?:User;
  private token?:string;
  constructor(private http:HttpClient) {
    if(sessionStorage.getItem(KEY_USER)){
      this.currentUser= JSON.parse(sessionStorage.getItem(KEY_USER)!);
      this.token = sessionStorage.getItem(KEY_TOKEN)!
    }
  }

  disconnect():void{
    this.currentUser=undefined;
    this.token=undefined;
    sessionStorage.clear()
  }

  get isAuthenticated():boolean{
    return !!this.currentUser;
  }

  get jwtToken():string|undefined{
    return this.token;
  }

  authentUser(login:string, password:string):Observable<User>{
    return this.http.post<AuthentResponse>('/api/auth/login', {email:login, password})
      .pipe(
        map((response:AuthentResponse)=>{
          this.currentUser = response.user;
          this.token = response.token;
          sessionStorage.setItem(KEY_USER, JSON.stringify(this.currentUser));
          sessionStorage.setItem(KEY_TOKEN, this.token)
          return this.currentUser;
        })
      )
  }
}

interface AuthentResponse{
  user:User,
  token:string
}

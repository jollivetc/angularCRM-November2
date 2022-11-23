import { Injectable } from '@angular/core';
import { User } from './model/user';

const KEY_USER = 'angular.crm.user'
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUser?:User;
  constructor() {
    if(sessionStorage.getItem(KEY_USER)){
      this.currentUser= JSON.parse(sessionStorage.getItem(KEY_USER)!);
    }
  }

  disconnect():void{
    this.currentUser=undefined;
    sessionStorage.clear()
  }

  get isAuthenticated():boolean{
    return !!this.currentUser;
  }

  authentUser(login:string, password:string):User{
    this.currentUser= {
      id:1,
      login:login,
      firstname:'John',
      lastname:'Doe'
    }
    sessionStorage.setItem(KEY_USER, JSON.stringify(this.currentUser));
    return this.currentUser;
  }
}

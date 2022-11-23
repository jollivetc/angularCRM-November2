import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginErrorMessages = {required: 'missing login',
          minlength: 'at least 3 characters'};
  passwordErrorMessages = {required:'missing password',
          no$InPassword: 'No $ in password'}

  loginForm:FormGroup;
  private subs:Subscription[]=[];

  constructor(private authent:AuthenticationService, private router:Router) {
    this.authent.disconnect();
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required, no$InPassword])
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  ngOnInit(): void {
  }

  logMeIn():void{
    this.subs.push(this.authent.authentUser(this.loginForm.value.login,
                                this.loginForm.value.password)
              .subscribe({
                next:(user:User)=>{this.router.navigateByUrl('/home')},
                error:(error:Error)=>{console.error(error)},
                complete:()=>{}
              }))
  }
}
function no$InPassword(c:AbstractControl):ValidationErrors|null {
  if((c.value as string).indexOf('$')<0){
    return null
  }else {
    return {'no$InPassword': 'no $ in password'};
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginErrorMessages = {required: 'missing login',
          minlength: 'at least 3 characters'};
  passwordErrorMessages = {required:'missing password',
          no$InPassword: 'No $ in password'}

  loginForm:FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required, no$InPassword])
    })
  }

  ngOnInit(): void {
  }

  logMeIn():void{
    console.log(this.loginForm);
  }
}
function no$InPassword(c:AbstractControl):ValidationErrors|null {
  if((c.value as string).indexOf('$')<0){
    return null
  }else {
    return {'no$InPassword': 'no $ in password'};
  }
}

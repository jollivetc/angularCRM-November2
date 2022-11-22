import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'crm-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @Input()
  field?:AbstractControl;
  @Input()
  errorMessages?:{[key:string]: string};

  constructor() { }

  ngOnInit(): void {
  }
  isError():boolean{
    return !!this.field && this.field.touched && this.field.invalid
  }
  get messages():string[]{
    return Object.keys(this.field?.errors as Object).map(
      key=> this.errorMessages?.[key]?this.errorMessages?.[key]:`no value for ${key}`
    );
  }

}
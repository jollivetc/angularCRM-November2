import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  price = 10;
  imageUrl = 'favicon.ico'
  legend= 'nice favicon'
  niceClass = 'backInRed'
  counter = 0;
  fruits = ['apple', 'banana','orange','strawberry']

  increaseCounter():void{
    this.counter++
  }
}

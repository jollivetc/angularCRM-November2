import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';

  received($event:string):void{
    console.log($event)
  }

  received2($event:string):void{
    console.log(`${$event} by received2`)
  }
}

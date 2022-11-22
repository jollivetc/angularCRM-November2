import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  @Input()
  label?:string;
  @Output()
  sended:EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  sendEvent():void{
    this.sended.emit(`${this.label} and modification`)
  }

}

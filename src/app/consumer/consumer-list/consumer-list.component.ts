import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit, OnDestroy {

  consumersObs$?:Observable<Consumer[]>;
  search:string= "";
  subs:Subscription[]=[]

  constructor(private consumerService:ConsumerService) { }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  ngOnInit(): void {
    this.consumersObs$ = this.consumerService.getAllConsumers();
  }

  searchConsumers():void{
    this.consumersObs$ = this.consumerService.findConsumers(this.search);
  }
  deleteConsumer(id:number):void{
    this.subs.push(this.consumerService.deleteConsumer(id).subscribe({
      next:(data:Object)=>{this.searchConsumers()},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    }))
  }
}

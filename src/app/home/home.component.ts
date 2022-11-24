import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscriber, Subscription, take } from 'rxjs';
import { DemoObservableService } from '../common/demo-observable.service';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  obs?:Observable<number>;
  private subs:Subscription[]=[]
  phoneNumber="0123456789"

  constructor(private demoObservable:DemoObservableService) { }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe());
  }

  ngOnInit(): void {
  }

  workWithData(data:number){
    console.log(data)
  }

  testObservable():void{
    console.log('before');
    const subscriber = {
      next:(data:number)=>this.workWithData(data),
      error:(error:Error)=>{console.error(error)},
      complete:()=>{console.log('complete')}
    }
    const subscription = this.demoObservable.getObservable().pipe(
        map(x=>x*10),
        take(2)
      ).subscribe(subscriber);
    this.subs.push(subscription);
    console.log('after')
  }

  testObservable2():void{
    console.log('before');
    this.subs.push(this.demoObservable.getObservable().pipe(
        map(x=>x*10),
        take(2)
      ).subscribe({
        next:(data:number)=>{
            //work with data
            console.log(data);
        },
        error:(error:Error)=>{console.error(error)},
        complete:()=>{console.log('complete')}
      }));

    console.log('after')
  }


  testObservableAsync():void{
    this.obs=this.demoObservable.getObservable()
  }
}

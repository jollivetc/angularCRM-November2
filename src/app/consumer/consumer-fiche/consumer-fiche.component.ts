import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnInit, OnDestroy {

  consumerForm: FormGroup;
  private subs:Subscription[]=[]
  constructor(private consumerService : ConsumerService, private router:Router, private route:ActivatedRoute) {
    this.consumerForm = new FormGroup({
      id: new FormControl(),
      civility: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      createdAt:new FormControl(),
      updatedAt:new FormControl()
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe())
  }

  ngOnInit(): void {
    this.subs.push(this.route.paramMap.subscribe({
      next:(data:ParamMap)=>{
        if(data.get('id')){
          this.subs.push(this.consumerService.getConsumer(data.get('id')!).subscribe({
            next:(data:Consumer)=>{this.consumerForm.patchValue(data)},
            error:(error:Error)=>{console.error(error)},
            complete:()=>{}
          }))
        }
      },
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    }))
  }
  onSubmit():void{
    this.subs.push(this.consumerService.saveConsumer(this.consumerForm.value).subscribe({
      next:(data:Consumer)=>{this.router.navigateByUrl('/consumer-list')},
      error:(error:Error)=> {console.error(error)},
      complete:()=>{}
    }))
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private consumerService : ConsumerService, private router:Router) {
    this.consumerForm = new FormGroup({
      civility: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(s=>s.unsubscribe())
  }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.subs.push(this.consumerService.createConsumer(this.consumerForm.value).subscribe({
      next:(data:Consumer)=>{this.router.navigateByUrl('/consumer-list')},
      error:(error:Error)=> {console.error(error)},
      complete:()=>{}
    }))
  }
}

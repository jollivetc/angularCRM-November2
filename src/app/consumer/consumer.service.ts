import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

  getAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>('/api/consumers');
  }

  findConsumers(search:string):Observable<Consumer[]>{
    return this.http.get<Consumer[]>(`/api/consumers?q=${search}`);
  }

  getConsumer(id:string):Observable<Consumer>{
    return this.http.get<Consumer>(`/api/consumers/${id}`)
  }

  saveConsumer(consumer:Consumer):Observable<Consumer>{
    if(consumer.id){
      return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer);
    }
    return this.http.post<Consumer>('/api/consumers', consumer);
  }
}

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

  createConsumer(consumer:Consumer):Observable<Consumer>{
    return this.http.post<Consumer>('/api/consumers', consumer);
  }
}

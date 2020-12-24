import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private data = new BehaviorSubject('defaultData');
  currentData = this.data.asObservable();
  constructor() { }

  changeData( d: string) {
    this.data.next(d);
  }
}

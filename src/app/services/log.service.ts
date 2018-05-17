import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Log } from '../models/log';

@Injectable()
export class LogService {
  private logSource = new BehaviorSubject<Log>({id: null, date: null, text: null});
  selectedLog = this.logSource.asObservable();

  private selectedSource = new BehaviorSubject<boolean>(false);
  selectedState = this.selectedSource.asObservable();

  logs: Log[] = [];
  constructor() { }

  getLogs = (): Observable<Log[]> => {
    return Observable.of(this.logs);
  }

  add = (log: Log) => {
    this.logs.unshift(log);
  }

  update = (log: Log) => {
    this.logs.forEach( (data, index) => {
      if (log.id === data.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }

  delete = (log: Log) => {
    this.logs.forEach( (data, index) => {
      if (log.id === data.id) {
        this.logs.splice(index, 1);
      }
    });
  }

  clearSelected = () => {
    this.selectedSource.next(false);
  }

  setSelectedLog = (log: Log) => {
    this.logSource.next(log);
    this.selectedSource.next(true);
  }
}

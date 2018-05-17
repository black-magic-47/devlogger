import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  log: Log = {
    id: '',
    text: '',
    date: null
  };
  isNew: Boolean = true;
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(data => {
      if ( data.id != null ) {
        this.log = data;
        this.isNew = false;
      }
    });
  }

  addLog = () => {
    this.log.id = this.uuidv4();
    this.log.date = new Date();
    this.logService.add(this.log);
    this.clearState();
  }

  updateLog = () => {
    this.isNew = true;
    this.logService.update(this.log);
    this.clearState();
  }

  clearState = () => {
    this.isNew = true;
    this.log = {
      id: '',
      text: '',
      date: null
    };
    this.logService.clearSelected();
  }

  uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

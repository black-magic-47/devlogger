import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  loaded = false;
  selectedLog = {
    id: '', date: null, text: ''
  };
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedState.subscribe( data => {
      if (data) {
        this.logService.selectedLog.subscribe( log => {
          this.selectedLog = log;
        });
      } else {
        this.selectedLog = {
          id: '', date: null, text: ''
        };
      }
    });
    this.logService.getLogs().subscribe(data => {
      this.logs = data;
      this.loaded = true;
    });
  }

  selectLog = (log: Log) => {
    this.logService.setSelectedLog(log);
  }

  deleteLog = (log: Log) => {
    if ( confirm('Are You Sure?') ) {
      this.logService.delete(log);
    }
  }

}

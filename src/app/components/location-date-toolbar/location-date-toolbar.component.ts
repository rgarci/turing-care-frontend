import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {DataServiceService} from '../../services/doctors/data-service.service';

@Component({
  selector: 'app-location-date-toolbar',
  templateUrl: './location-date-toolbar.component.html',
  styleUrls: ['./location-date-toolbar.component.css']
})
export class LocationDateToolbarComponent implements OnInit {
  myDate = new Date();
  formattedDate = '';
  actualRoute = '';

  constructor(private datePipe: DatePipe,private data: DataServiceService){
    this.formattedDate = this.datePipe.transform(this.myDate, 'EEEE, d MMMM y');
  }
  ngOnInit(): void {
    this.data.currentData.subscribe(message => this.actualRoute = message);
  }
}

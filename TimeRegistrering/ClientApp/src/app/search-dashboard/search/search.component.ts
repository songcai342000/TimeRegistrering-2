import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ListGroup } from '../../listGroup';
import { SearchCondition } from '../../searchCondition';
import { TimeService } from '../../time.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() getGroups = new EventEmitter<string>();
  userName: string = localStorage.getItem('userName');
  projectName: string;
  date: Date;
  sarchCondition: SearchCondition;
  conditions: string;

  constructor(private router: Router, private timeService: TimeService) { }

  ngOnInit() {
  }

  //projectName = ['', 'ABC kidgarden construction', 'Sunshine primary school construction'];
  //searchCondition = new SearchCondition('', this.userName, null);

  sendConditions(): void {
    this.conditions = this.projectName + '/' + this.date;
    this.getGroups.emit(this.conditions);
    this.projectName = '';
    this.date = null;
  }


  getNameValue(event: any) {
    this.projectName = event.target.value;
  }

  getDateValue(event: any) {
    this.date = event.target.value;
  }

  reset() {
    this.projectName = "";
    this.date = null;

  }
}



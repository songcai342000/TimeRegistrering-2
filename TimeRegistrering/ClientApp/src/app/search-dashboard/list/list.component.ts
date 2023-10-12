import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeRegistration } from '../../timeRegistration';
import { ListGroup } from '../../listGroup';
import { SearchCondition } from '../../searchCondition';
import { TimeService } from '../../time.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public timeRegistrationsByYear: TimeRegistration[];
  myUserName: string = localStorage.getItem("userName");
  search: string;
  searchCondition: SearchCondition;
  allTimesheets: TimeRegistration[] = JSON.parse(localStorage.getItem('registrations'));
  registrations: TimeRegistration[] = [];
  result: string = '';
//  @ViewChild('elem', { static: true }) elem: ElementRef;
  constructor(private router: Router, private timeService: TimeService) { }

  ngOnInit() {
    let conditions = sessionStorage.getItem('conditions');
    let notice = document.getElementById('notice');
    let noticeSpans = document.getElementsByTagName('span');
    notice.setAttribute('style', 'visibility: hidden');
    noticeSpans[0].setAttribute('style', 'visibility: hidden');
    if ( conditions != '' && conditions != null) {
      this.onGetGroups(conditions);
    }
  }

  onGetGroups(conditions: string) {
    if (this.allTimesheets == null || this.allTimesheets.length == 0) {
      let notice = document.getElementById('notice');
      notice.style.visibility = 'visible';
      notice.style.position = 'relative';
      notice.style.top = '3em';
    }
    let l = this.allTimesheets.length;
    this.registrations.length = 0;
    let timesheets = document.getElementById('timeSheets');
    let notice = document.getElementById('notice');
    let container = document.getElementById('resultContainer');
    container.innerHTML = '';
    timesheets.style.visibility = 'hidden';
    notice.style.visibility = 'hidden';
    this.result = '';
    if (conditions == '/null') {
      for (var a = 0; a < l; a++) {
        if (this.allTimesheets[a].userId == 2) {
          this.registrations.push(this.allTimesheets[a]);
        }
      }
    }
    else {
      let s = conditions.split('/');
      if ((s[0] == 'undefined' || s[0] == '') && s[1] != 'undefined') {
        let time = new Date(s[1]);
        for (let i = 0; i < l; i++) {
          let rtime = this.allTimesheets[i].registrationTime;
          if (new Date(rtime).getFullYear() == time.getFullYear() && new Date(rtime).getMonth() == time.getMonth() && new Date(rtime).getDate() == time.getDate()) {
            this.registrations.push(this.allTimesheets[i]);
          }
        }
      }
      else if ((s[0] == 'undefined' || s[0] == '') && s[1] == 'undefined') {
        for (let i = 0; i < l; i++) {
          if (this.allTimesheets[i].userId == 2) {
            this.registrations.push(this.allTimesheets[i]);
          }
        }
      }
      else if (s[1] == 'undefined' && s[0] != 'undefined' && s[0] != '') {
        for (let i = 0; i < l; i++) {
          if (this.allTimesheets[i].projectName == s[0]) {
            this.registrations.push(this.allTimesheets[i]);
          }
        }
      }
      
      else if (s[1] == 'null' && s[0] != 'undefined' && s[0] != '') {
        for (let i = 0; i < l; i++) {
          if (this.allTimesheets[i].projectName == s[0]) {
            this.registrations.push(this.allTimesheets[i]);
          }
        }
      }
      else if ((s[1] != 'undefined' && s[1] != 'null') && (s[0] != 'undefined' && s[0] != '')) {
        let time = new Date(s[1]);
        for (let i = 0; i < l; i++) {
          let rtime = this.allTimesheets[i].registrationTime;
          if (this.allTimesheets[i].projectName == s[0] && new Date(rtime).getFullYear() == time.getFullYear() && new Date(rtime).getMonth() == time.getMonth() && new Date(rtime).getDate() == time.getDate()) {
            this.registrations.push(this.allTimesheets[i]);
          }
        }
      }
      /*else if (s[1] == 'undefined' && s[0] == 'undefined') {
        alert(rl);
        for (let i = 0; i < l; i++) {
          if (this.allTimesheets[i].userId == 2) {
            this.registrations.push(this.allTimesheets[i]);
          }
        }
      }*/
    }
    if (this.registrations.length > 0) {
      timesheets.style.visibility = 'visible';
      timesheets.style.height = 'auto';
      for (let i = 0; i < this.registrations.length; i++) {
        this.result += '<div style="border-bottom: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["projectName"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["comment"]
          + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["hours"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["registrationTime"] + '</div><div style="padding-top: 5%; padding-bottom: 5%; border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-right: 1px solid #ddd outset; border-radius: 0; padding-left: 2em"><a type="button" class="btn border-3 text-white" style="width: auto; height: auto; background-color: #b300b3; vertical-align: central; border-radius: 25px; padding: 0.3em 0.8em 0.3em 0.8em; font-size: 0.9em; font-weight: 600" id="delete' + i + '" href="/delete/' + this.registrations[i]["registrationId"] + '">Delete</a></div>';
      }
      /*for (let i = 0; i < this.registrations.length; i++) {
        this.result += '<div style="border-bottom: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["projectName"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["comment"]
          + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["hours"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.registrations[i]["registrationTime"] + '</div><div style="padding-top: 5%; padding-bottom: 5%; border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-right: 1px solid #ddd outset; border-radius: 0; padding-left: 2em"><a type="button" class="btn border-3 text-white" style="width: auto; height: auto; background-color: #b300b3; vertical-align: central; border-radius: 25px; padding: 0.3em 0.8em 0.3em 0.8em; font-size: 0.9em; font-weight: 600" id="delete' + this.registrations[i]['registrationId'] + '">Delete</a></div>';
      }*/
      timesheets.scrollIntoView();
    }
    else {
      //document.getElementById('base').style.height = do
      document.getElementById('search').style.height;
      notice.style.visibility = 'visible';
      notice.style.position = 'relative';
      notice.style.top = '3em';
    }
    container.innerHTML = this.result;
    this.listenerEvents();
    sessionStorage.setItem('conditions', conditions);   
  }

  listenerEvents() {
    let elems = document.getElementById('timeSheets').querySelectorAll('a');
    for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener('mouseover', this.hover.bind(this));
      elems[i].addEventListener('mouseout', this.removeHover.bind(this));
      //elems[i].addEventListener('click', this.delete.bind(this));
    }
  }

  printvisible() {
    document.getElementById('printtooltip').style.visibility = 'visible';
  }

  printinvisible() {
    document.getElementById('printtooltip').style.visibility = 'hidden';
  }

  pdfvisible() {
    document.getElementById('pdftooltip').style.visibility = 'visible';
  }

  pdfinvisible() {
    document.getElementById('pdftooltip').style.visibility = 'hidden';
  }

  hover(event: any) {
    event.target.style.backgroundColor = '#ff33ff';
  }

  removeHover(event: any) {
    event.target.style.backgroundColor = '#b300b3';
  }

  /* alternative method for deleting* /
  /*delete(event: any) {
    if (confirm('You will delete the registration!')) {
      let id = parseInt(event.target.id.replace('delete', ''));
      this.timeService.deleteRegistration(id);
      location.reload();
    }
  }*/
}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListGroup } from '../listGroup';
import { TimeService } from '../time.service';
import { TimeRegistration } from '../timeRegistration';

@Component({
  selector: 'app-alltimesheets',
  templateUrl: './alltimesheets.component.html',
  styleUrls: ['./alltimesheets.component.css']
})
 
export class AlltimesheetsComponent implements OnInit {

  public timeRegistrationsByYear: TimeRegistration[];
  allListGroups: ListGroup[];
  newRegistration: TimeRegistration;
  myUserName: string = localStorage.getItem("userName");
  allTimesheets: TimeRegistration[] = JSON.parse(localStorage.getItem('registrations'));
  result: string ='';

  constructor(private router: Router, private timeService: TimeService) { }
  ngOnInit() {
    let notice = document.getElementById('notice');
    let timesheets = document.getElementById('timeSheets');
    let tableContainer = document.getElementById('tableContainer');
    notice.style.visibility = 'hidden';
    timesheets.style.visibility = 'hidden';
    if (this.allTimesheets != null && this.allTimesheets.length > 0) {
      tableContainer.style.visibility = 'visible';
      timesheets.style.visibility = 'visible';
      timesheets.style.height = 'auto';
      this.presentList();
      sessionStorage.setItem('conditions', '');
      //document.getElementById('resultContainer').style.overflowY = 'scroll';
      /*let hc = document.getElementById('resultContainer').style.height;
      if (parseInt(hc.substring(0, hc.length - 2)) >= 200) {
        document.getElementById('resultContainer').style.overflowY = 'scroll';
      }*/
    }
    else {
      notice.style.visibility = 'visible';
      document.getElementById('notice').style.position = 'relative';
      document.getElementById('notice').style.top = '-6em';
    }
    this.listenerEvents();
  }

  listenerEvents() {
    let all = this.allTimesheets;
    if (all != null || all.length > 0) {
      for (let i = 0; i < all.length; i++) {
        let elem = document.getElementById('delete' + i);
        if (elem) {
          elem.addEventListener('mouseover', this.hover.bind(this));
          elem.addEventListener('mouseout', this.removeHover.bind(this));
        }
      }
    }
  }

  presentList() {
    /*for (let i = 0; i < this.allTimesheets.length; i++) {
      this.result += '<div class="p-1" style="border-bottom: 1px solid #ddd; border-radius: 0">' + this.allTimesheets[i]['projectName'] + '</div><div class="p-1" style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0">' + this.allTimesheets[i]['comment']
        + '</div><div class="p-1" style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0">' + this.allTimesheets[i]['hours'] + '</div><div class="p-1" style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0">' + this.allTimesheets[i]['registrationTime'].toString().substring(0, 10) + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-right: 1px solid #ddd outset; border-radius: 0"><a href="delete/' + this.allTimesheets[i]['registrationId'] + '"' + '>Delete</a></div>';
    }
    for (let i = 0; i < this.allTimesheets.length; i++) {
      this.result += '<div style="border-bottom: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["projectName"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["comment"]
        + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["hours"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + (new Date(this.allTimesheets[i]["registrationTime"])).getFullYear() + '-' + (new Date(this.allTimesheets[i]["registrationTime"])).getMonth() + '-' + (new Date(this.allTimesheets[i]["registrationTime"])).getDate() + '</div><div style="padding-top: 5%; padding-bottom: 5%; border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-right: 1px solid #ddd outset; border-radius: 0; padding-left: 2em"><a type="button" class="btn border-3 text-white" style="width: 4.5vw; height: 3.5vh; background-color: #b300b3; vertical-align: central; border-radius: 25px; padding-top: 2%; padding-bottom: 5%; font-size: 0.9em; font-weight: 600" href="/delete/' + this.allTimesheets[i]["registrationId"] + '">Delete</a></div>';
    }*/
    for (let i = 0; i < this.allTimesheets.length; i++) {
      this.result += '<div style="border-bottom: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["projectName"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["comment"]
        + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["hours"] + '</div><div style="border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-radius: 0; padding: 0.5em">' + this.allTimesheets[i]["registrationTime"] + '</div><div style="padding-top: 5%; padding-bottom: 5%; border-bottom: 1px solid #ddd; border-left: 1px solid #ddd; border-right: 1px solid #ddd outset; border-radius: 0; padding-left: 2em"><a type="button" class="btn border-3 text-white" style="width: auto; height: auto; vertical-align: central; padding: 0.3em 0.8em 0.3em 0.8em; background-color: #b300b3; border-radius: 25px; font-size: 0.9em; font-weight: 600" id = "delete' + i + '" href="/delete/' + this.allTimesheets[i]["registrationId"] + '">Delete</a></div>';
    }
    document.getElementById('resultContainer').innerHTML = this.result;
  }

  /*@HostListener('window:click', ['$event'])
  handleStorage(event) {
    let v = sessionStorage.getItem('allist');
    if (v == 'y') {
      document.getElementById("test").style.height = "auto";
      this.presentList();
      localStorage.setItem('allist', '');
    }
  }*/

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
}

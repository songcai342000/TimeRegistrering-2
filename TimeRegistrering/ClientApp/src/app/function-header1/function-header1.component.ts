import { Component, HostListener, OnInit, Output, Input} from '@angular/core';
import { Data, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { TimeService } from '../time.service';
import { TimeRegistration } from '../timeRegistration';
import { User } from '../user';

@Component({
  selector: 'app-function-header1',
  templateUrl: './function-header1.component.html',
  styleUrls: ['./function-header1.component.css']
})
export class FunctionHeader1Component implements OnInit {
  [x: string]: any;
  earliestDate: Date;
  userName: string = localStorage.getItem('userName');
  project: string;
  com: string;
  hrs: number;
  userId: number = parseInt(localStorage.getItem('userId'));
  registrationId: number;
  time: Date = new Date(Date.now());
  newTimeValue: Date;
  dateWidth: string = '50px';
    //@Output() registrationEmit = new EventEmitter();
    ;

  constructor(private router: Router, private timeService: TimeService) {
  }

  ngOnInit() {
    //this.loadOptions();
    this.getUserId();
    //sessionStorage.setItem('registrationId', this.registrationId.toString());
    let d = new Date(Date.now());
    this.earliestDate = new Date('d.getFullYear(), d.setMonth(d.getMonth() - 3), d.getDate()');
  }

  ngDestroy() {
    this.removeOptions();
  }

  projectName = ['', 'ABC kidgarden construction', 'Sunshine primary school construction'];
  // timeRegistration = new TimeRegistration(0, 1, '', '', null, new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate()));
  timeRegistration = new TimeRegistration(0, this.userId, '', '', null, null);

  //add a new registration
  registrate(timeRegistration: TimeRegistration): void {
    let token = localStorage.getItem('authToken');
    if (token == 'undefined' || token == null) {
      //document.getElementById('projectError').innerHTML = 'Please log in!';
      alert('Please log in!');
      this.router.navigate(['login']);
    }
    else {
      if (this.timeRegistration.projectName != '' && this.timeRegistration.hours != null && this.timeRegistration.hours > 0 && this.timeRegistration.hours < 25 && new Date(this.timeRegistration.registrationTime) <= this.time) {
        let digitals = this.timeRegistration.hours.toString().split('.');
        if (digitals.length > 1) {
          if (digitals[1] == '0' || digitals[1] == '5') {
            alert('r');
            this.timeService.newRegistration(this.timeRegistration);
            this.project = '';
            this.com = '';
            this.hrs = null;
            this.time = null;
            //if (location.href == 'https://localhost:44379/alltimesheets') {
            if (location.href == 'https://timeregistrering-song.azurewebsites.net/alltimesheets') {
              location.reload(); 0
            }
            this.router.navigate(['alltimesheets']);
          }
        }
        else {
          this.timeService.newRegistration(this.timeRegistration);
          this.project = '';
          this.com = '';
          this.hrs = null;
          this.time = null;
          //if (location.href == 'https://localhost:44379/alltimesheets') {
          if (location.href == 'https://timeregistrering-song.azurewebsites.net/alltimesheets') {
            location.reload(); 0
          }
          this.router.navigate(['alltimesheets']);
        }
      }
      if (this.timeRegistration.projectName == '') {
        document.getElementById('projectError').innerHTML = 'Project name is required!';
      }
      if (this.timeRegistration.hours == null) {
        document.getElementById('durationError').innerHTML = 'Duration is required!';
      }
      if (this.timeRegistration.registrationTime == null) {
        document.getElementById('dateError').innerHTML = 'Date is required!';
      }
    }
  }

  getUserId() {
    this.timeService.getUserId(this.userName).subscribe(userId => this.userId = userId);
  }

  /*errorHours(event: any) {
    if (event.target.value != '' || event.target.value != 'undefined' && document.getElementById('durationError').innerHTML != '') {
      document.getElementById('durationError').innerHTML = '';
    }
  }*/

  loadOptions() {
    let token = localStorage.getItem('authToken');
    let s = document.getElementsByTagName('select');
    let select = s[0];
    let l = select.children.length;
    if (token == 'undefined' || token == null) {
      select.setAttribute('visibility', 'hidden');
      alert('Please log in!');
      this.router.navigate(['login']);
    }
    else {
       if (l == 0) {
        for (let i = 0; i < 3; i++) {
          let o = document.createElement('option');
          let t = document.createTextNode(this.projectName[i]);
          o.appendChild(t);
          select.appendChild(o);
        }
      }
    }
  }

  removeOptions() {
    let s = document.getElementsByTagName('select');
    let select = s[0];
    let l = select.children.length;
    for (let j = 0; j < 3; j++) {
      select.children[j].remove();
      j--;
    }
  }

  projectErrorMessage(event: any) {
    let elp = document.getElementById('projectError');
    if (event.target.value == '') {
      elp.innerHTML = 'Project name is required!';
    }
    else {
      elp.innerHTML = '';
    }
  }


  durationErrorMessage(event: any) {
    let eld = document.getElementById('durationError');
    let v = event.target.value;
    if (v == '') {
      eld.innerHTML = 'Duration is required!';
    }
    else if (v < 0 || v > 24) {
      eld.innerHTML = 'Please enter a number between -1 and 25!';
    }
    else if (v >= 0 && v <= 24) {
      let digitals = v.toString().split('.');
      let digital = (v.toString().split('.'))[1];
      if (digitals.length > 1 && digital != 5 && digital != 0) {
        eld.innerHTML = 'The number after digital point can only be 0 or 5!';
      }
      else {
        eld.innerHTML = '';
      }
    }
    else {
      eld.innerHTML = '';
    }
    /*let s = document.getElementsByTagName('select');
    let select = s[0];
    if (select.children.length == 0) {
      for (let i = 0; i < 3; i++) {
        select.children[i].remove();
        i--;
      }
    }*/
  }

  dateErrorMessage(event: any) {
    let elda = document.getElementById('dateError');
    this.newTimeValue = new Date(event.target.value);
    if (event.target.value == '') {
      elda.innerHTML = 'Date is required!';
    }
    else if (this.newTimeValue > this.time) {
      elda.innerHTML = 'Date cannot be later than today';
    }
    else if (this.newTimeValue <= this.time) {
      elda.innerHTML = '';
    }
    else {
      elda.innerHTML = '';
    }
  }

  //trigger input text change event
 /* @HostListener('window:click', ['$event'])
  handleStorage(event) {
    let project = document.getElementById("projectName");
    let change = new Event('change', { bubbles: true });
    project.dispatchEvent(change);
  }*/

  removeProject() {
    let token = localStorage.getItem('authToken');
    alert(token);
    if (token == 'undefined' || token == null) {
      let select = document.getElementById('projectName');
      select.querySelectorAll('option').forEach(n => n.remove());
    }
  }
}



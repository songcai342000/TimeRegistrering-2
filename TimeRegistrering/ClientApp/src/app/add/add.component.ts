import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../time.service';
import { TimeRegistration } from "../timeRegistration";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  /*id: number;
  hourSum: number;
  newHours: number;*/

  constructor(private router: Router, private timeService: TimeService) { }

  ngOnInit() {
    //this.id = 2;
  }

/*projectName = ['ABC kidgarden construction', 'Sunshine primary school construction'];
  //create an object
  //timeRegistration = new TimeRegistration(1, 1, '', '', 0, new Date(Date.now()));
  timeRegistration = new TimeRegistration(0, 1, '', '', null, new Date(Date.now()));

    //add a new registration
  newRegistration(timeRegistration: TimeRegistration): void {
    //this.timeService.newRegistration(this.timeRegistration).subscribe(() => {
      //this.router.navigateByUrl('/all');
      if (this.hourSum > 100) {
        alert('Registreringen lykkes. Antall timer er over 100!');
      }
      else {
        alert('Registreringen lykkes!');
      }
    });
    //this.resetForm();
  }*/

  //get total hours from db
  /*getHourSum(): void {
    this.timeService.getHourSum()
      .subscribe(hourSum => this.hourSum = hourSum);
  }

  //get sum of the registated hours
  showSum(event: any) {
    this.hourSum = parseInt(event.target.value);
  }

  //get the new hours and calculate the new total hours
  getNewHours(event: any) {
    this.newHours = parseInt(event.target.value);
    this.hourSum += this.newHours;
  }

  resetForm() {
    document.getElementsByTagName('form')[0].reset();
  }*/
}

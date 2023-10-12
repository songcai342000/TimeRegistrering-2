import { Injectable, Inject } from '@angular/core';
import { TimeRegistration } from './timeRegistration';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
//import { T } from '@angular/core';
import { of } from 'rxjs';
import { ListGroup } from './listGroup';
import { SearchCondition } from './searchCondition';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  myRegistrations: TimeRegistration[];
  searchCondition: SearchCondition;
  timeRegistration: TimeRegistration;
  private registrationUrl = 'api/TimeRegistrations';
  private getSumUrl = 'api/TimeRegistrations/GetTimeSum';
  //private timeRegistration: TimeRegistration;

  constructor(private http: HttpClient, private router: Router) { }

  getUserId(userName: string) {
    return this.http.get<number>('api/User/GetUserId');
  }

  newRegistration(timeRegistration: TimeRegistration) {
    let ls = localStorage.getItem('registrations');
    if (ls == '[]' || ls == null) {
      this.myRegistrations = [
        /*{ registrationId: 1, userId: 2, projectName: 'ABC Kidgarden Construction', comment: '', hours: 7, registrationTime: new Date('2021 02 01 16 00 00') },
        { registrationId: 2, userId: 2, projectName: 'ABC Kidgarden Construction', comment: '', hours: 7, registrationTime: new Date('2021 02 02 16 00 00') }*/
      ];
      timeRegistration.registrationId = 3;
      this.myRegistrations.push(timeRegistration);
    }
    else {
      this.myRegistrations = JSON.parse(ls);
      timeRegistration.registrationId = this.myRegistrations[this.myRegistrations.length - 1].registrationId + 1;
      this.myRegistrations.push(timeRegistration);
    }
    return localStorage.setItem('registrations', JSON.stringify(this.myRegistrations));
  }

  /*searchMyRegistrations(conditions: string): Observable<ListGroup[]> {
    alert(conditions);
    //let s = conditions.split('/');
    //this.searchCondition = { projectName: s[0], userName: s[1], date: new Date(s[2]) };
    return this.http.get<ListGroup[]>('api/TimeRegistrations/GetSearchRegistrations' + '/' + conditions);
  }*/

  searchMyRegistrations(conditions: string): Observable<ListGroup[]> {
    return this.http.get<ListGroup[]>('api/TimeRegistrations/GetSearchRegistrations' + '/' + conditions);
  }

  //get hours sum
  getHourSum(): Observable<number> {
    return this.http.get<any>(this.getSumUrl);
  }

  //delete a registration from the database with http delete
  deleteRegistration(id: number) {
    this.myRegistrations = JSON.parse(localStorage.getItem('registrations'));
    for (let i = 0; i < this.myRegistrations.length; i++) {
      if (this.myRegistrations[i]['registrationId'] == id) {
        this.myRegistrations.splice(i, 1);
      }
    }
   return localStorage.setItem('registrations', JSON.stringify(this.myRegistrations));
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient, private router: Router) { }

  login(userDetails) {
    return this.http.post<any>('/api/login', userDetails)
      .pipe(map(response => {
        localStorage.setItem('authToken', response.token);
        this.setUserDetails();
        return response;
      }));
  }
  
  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));
      userDetails.userName = decodeUserDetails.sub;
      userDetails.firstName = decodeUserDetails.firstName;
      userDetails.isLoggedIn = true;
      userDetails.role = decodeUserDetails.role;
      //localStorage.setItem('userName', userDetails.userName);
      if (userDetails.role == 'Admin') {
        localStorage.setItem('userId', '1');
      }
      else if (userDetails.role == 'User') {
        localStorage.setItem('userId', '2');
      }
      this.userData.next(userDetails);
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('registrations');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}

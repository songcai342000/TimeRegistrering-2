import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserRole } from '../role';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isExpanded = false;
  userDataSubscription: any;
  userData = new User();
  userRole = UserRole;

  constructor(private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    if (confirm('Are you sure you will log out?')) {
      this.authService.logout();
    }
  }

}

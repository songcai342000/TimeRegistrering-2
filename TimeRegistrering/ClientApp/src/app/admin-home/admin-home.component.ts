import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  adminData: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchAdminData();
  }

  fetchAdminData() {
    this.userService.getAdminData().subscribe(
      (result: string) => {
        this.adminData = result;
      }
    );
  }

  jumpToCreate() {
    let el = document.getElementById('create-project');
    el.scrollIntoView();
  }

  jumpToFind() {
    let el = document.getElementById('find-timesheet');
    el.scrollIntoView();
  }
}    

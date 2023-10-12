import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeRegistration } from '../timeRegistration';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  registration: TimeRegistration;

  constructor(private route: ActivatedRoute, private router: Router, private timeService: TimeService) { }

  ngOnInit() {
    this.deleteRegistration();
    //this.router.navigate(['/alltimesheets']);
    //window.history.back();
    let url = document.referrer;
    let arr = url.split('/');
    let navUrl = arr[arr.length - 1];
    if (navUrl == 'alltimesheets') {
      this.router.navigateByUrl(navUrl);
    }
    else {
      this.router.navigateByUrl('search-dashboard/' + navUrl);
    }

  }

  //delete the registration by id
  deleteRegistration() {
    if (confirm('The registration will be deleted!')) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.timeService.deleteRegistration(id);
    }
  }

}

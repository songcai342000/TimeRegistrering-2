import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subfooter3',
  templateUrl: './subfooter3.component.html',
  styleUrls: ['./subfooter3.component.css']
})
export class Subfooter3Component implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.shiftColorImage();
  }

  shiftColorImage() {
    let imgs = document.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].src == 'assets/images/aksimred.png') {
        imgs[i].src = 'assets/images/aksimred.png';
      }
      else {
        imgs[i].src = 'assets/images/aksimred.png'
      }
    }
    //setTimeout(() => this.shiftGreenImage(), 300);
  }

  shiftGreenImage() {
    let imgs = document.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = 'assets/images/aksimgreen.png';
    }
  }
}

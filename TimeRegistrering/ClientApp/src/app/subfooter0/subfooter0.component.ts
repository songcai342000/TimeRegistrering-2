import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subfooter0',
  templateUrl: './subfooter0.component.html',
  styleUrls: ['./subfooter0.component.css']
})
export class Subfooter0Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showIcon(event: any) {
    let id = event.target.id;
    let nr = id.substr(5, 1);
    let label = document.getElementById('label' + nr);
    let icon = document.getElementById('icon' + nr);
    let length = label.innerHTML.length;
    let width = label.clientWidth;
    let distance = -(width / 2) - 2 + 'px';
    icon.setAttribute('style', 'transform: translateX(' + distance + '); visibility: visible; transition: 0.2s');
    label.setAttribute('style', 'transform: translateX(1.25em)');
  }

  hideIcon(event: any) {
    let id = event.target.id;
    let nr = id.substr(5, 1);
    let label = document.getElementById('label' + nr);
    let icon = document.getElementById('icon' + nr);
    let length = label.innerHTML.length;
    let distance = -(length / 2) + 'em';
    icon.setAttribute('style', 'transform: translateX(oem); visibility: hidden');
    label.setAttribute('style', 'transform: translateX(0em)');

  }

}

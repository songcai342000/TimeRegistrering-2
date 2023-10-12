import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isNormal: boolean = true;
  ngOnInit() {
    /*let b = document.getElementById('base');
    let t = document.getElementById('text');
    t.addEventListener('mousemove', this.setMagnifer, false);
    t.addEventListener('mouseout', this.removeMagnifer, false);
    b.addEventListener('mousedown', this.toggelScale, true);*/
  }

  setMagnifer(event: MouseEvent) {
    let m = document.getElementById('magnifer');
    m.setAttribute('style', 'background-color: red; width: 1em; height: 1em; position: absolute; left:' + event.offsetX + 'px; top: ' + event.offsetY + 'px');
  }

  removeMagnifer(event: MouseEvent) {
    let m = document.getElementById('magnifer');
    m.setAttribute('style', 'visibility: hidden; width: 0; height: 0;');
  }

  toggelScale(event: MouseEvent) {
    this.isNormal = !this.isNormal;
    let t = document.getElementById('text');
    if (this.isNormal == true) {
      t.setAttribute('style', 'font-size: 1.2em');
    }
    else {
      t.setAttribute('style', 'transform: scale(1)');
    }
  }
}

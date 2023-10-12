import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subfooter2Component } from './subfooter2.component';

describe('Subfooter2Component', () => {
  let component: Subfooter2Component;
  let fixture: ComponentFixture<Subfooter2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subfooter2Component ]
    });
    fixture = TestBed.createComponent(Subfooter2Component);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subfooter5Component } from './subfooter5.component';

describe('Subfooter5Component', () => {
  let component: Subfooter5Component;
  let fixture: ComponentFixture<Subfooter5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subfooter5Component ]
    });
    fixture = TestBed.createComponent(Subfooter5Component);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

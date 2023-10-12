import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subfooter1Component } from './subfooter1.component';

describe('Subfooter1Component', () => {
  let component: Subfooter1Component;
  let fixture: ComponentFixture<Subfooter1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subfooter1Component ]
    });
        fixture = TestBed.createComponent(Subfooter1Component);
        component = fixture.componentInstance; // AdminHomeComponent test instance
      }));
});

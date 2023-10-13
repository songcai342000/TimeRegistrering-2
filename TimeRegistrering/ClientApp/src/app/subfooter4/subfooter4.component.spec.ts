import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Subfooter4Component } from './subfooter4.component';

describe('Subfooter4Component', () => {
  let component: Subfooter4Component;
  let fixture: ComponentFixture<Subfooter4Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Subfooter4Component ]
    });
    fixture = TestBed.createComponent(Subfooter4Component);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

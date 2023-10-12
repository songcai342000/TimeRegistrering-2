import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionHeader2Component } from './function-header2.component';

describe('FunctionHeader2Component', () => {
  let component: FunctionHeader2Component;
  let fixture: ComponentFixture<FunctionHeader2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionHeader2Component ]
    });
    fixture = TestBed.createComponent(FunctionHeader2Component);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltimesheetsComponent } from './alltimesheets.component';

describe('AlltimesheetsComponent', () => {
  let component: AlltimesheetsComponent;
  let fixture: ComponentFixture<AlltimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltimesheetsComponent ]
    });
    fixture = TestBed.createComponent(AlltimesheetsComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

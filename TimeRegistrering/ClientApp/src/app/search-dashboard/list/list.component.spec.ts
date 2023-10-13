import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent]
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));

  
});

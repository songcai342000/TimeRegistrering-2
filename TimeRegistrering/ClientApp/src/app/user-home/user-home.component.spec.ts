import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeComponent ]
    });
    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

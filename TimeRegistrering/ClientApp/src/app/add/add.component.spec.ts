import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent ]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent ]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

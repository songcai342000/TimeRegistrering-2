import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteComponent } from './delete.component';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComponent ]
    });
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

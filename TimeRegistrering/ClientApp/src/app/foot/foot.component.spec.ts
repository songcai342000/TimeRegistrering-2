import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FootComponent } from './foot.component';

describe('FootComponent', () => {
  let component: FootComponent;
  let fixture: ComponentFixture<FootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FootComponent ]
    });
    fixture = TestBed.createComponent(FootComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

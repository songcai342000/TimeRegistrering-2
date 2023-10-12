import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootComponent } from './foot.component';

describe('FootComponent', () => {
  let component: FootComponent;
  let fixture: ComponentFixture<FootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootComponent ]
    });
    fixture = TestBed.createComponent(FootComponent);
    component = fixture.componentInstance; // AdminHomeComponent test instance
  }));
});

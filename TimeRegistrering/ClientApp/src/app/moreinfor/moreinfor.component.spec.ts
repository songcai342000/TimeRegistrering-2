import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoreinforComponent } from './moreinfor.component';

describe('MoreinforComponent', () => {
  let component: MoreinforComponent;
  let fixture: ComponentFixture<MoreinforComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreinforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreinforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subfooter0Component } from './subfooter0.component';

describe('Subfooter0Component', () => {
  let component: Subfooter0Component;
  let fixture: ComponentFixture<Subfooter0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subfooter0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Subfooter0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

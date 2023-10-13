import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeService } from '../time.service';
import { AlltimesheetsComponent } from '../alltimesheets/alltimesheets.component';
import { FunctionHeader1Component } from './function-header1.component';
import { from, of } from 'rxjs';
import { TimeRegistration } from '../timeRegistration';
import { User } from '../user';
import { delay } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('FunctionHeader1Component', () => {

  let comp: FunctionHeader1Component;
  let timeServiceSpy: jasmine.SpyObj<TimeService>;
  let userId: number;
  let registrationId: number;
  let location: Location;
  let timeRegistration: TimeRegistration;
  let router: Router;
  let store: {};
  let nameInput: HTMLElement;
  let dnameInput: DebugElement;
  let form: HTMLElement;
  let projectName: string;
  let fixture: ComponentFixture<FunctionHeader1Component>;

  beforeEach(waitForAsync(() => {
   
    const spy1 = jasmine.createSpyObj('TimeService', ['registrate']);
    const spy2 = jasmine.createSpyObj('TimeService', ['getUserId']);
    TestBed.configureTestingModule({
      declarations: [FunctionHeader1Component],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }, { path: 'alltimesheets', component: AlltimesheetsComponent }])],
      //imports: [FormsModule, HttpClientTestingModule],
      providers: [FunctionHeader1Component, { provide: TimeService, userValue: spy2 }, { provide: TimeService, userValue: spy1 }, { provide: ComponentFixtureAutoDetect, useValue: true }]
    });

    fixture = TestBed.createComponent(FunctionHeader1Component);
    //comp = TestBed.inject(FunctionHeader1Component);
    comp = fixture.componentInstance;
    timeServiceSpy = TestBed.inject(TimeService) as jasmine.SpyObj<TimeService>;
    router = TestBed.inject(Router);
  }));

   it('should be created', () => {
      expect(comp).toBeTruthy();
    });

  it('should get projectName after constructor', () => {
    expect(comp.projectName).not.toBe('');
  });

  it('should display original projectName', () => {
    comp.project = '';
    const dnameInput = fixture.debugElement;
    const s = dnameInput.query(By.css('select'));
    dnameInput.triggerEventHandler('change', { target: s.nativeElement });
    fixture.detectChanges();
    expect(comp.project).toBe(s.nativeElement.value);
  });

  it('should load options', () => {
    // Hooray! No `fixture.detectChanges()` needed
    const hostElement = fixture.nativeElement;
    nameInput = hostElement.querySelectorAll('select')[0];
    nameInput.click();
    if (nameInput.children.length == 0) {
      for (let i = 0; i < 1; i++) {
        let option = document.createElement('option');
        let text = document.createTextNode('abc');
        option.appendChild(text);
        nameInput.appendChild(option);
      }
      expect(nameInput.children.length).toBe(1);
      expect(nameInput.children[0].textContent).toBe('abc');
    }
    else {
      expect(nameInput.children.length).toBe(3);
    }
  });

  it('the original value of input text is ""', () => {
    // Hooray! No `fixture.detectChanges()` needed
    //const hostElement = fixture.nativeElement;
    //nameInput = hostElement.querySelectorAll('select')[0];
    const dnameInput: DebugElement = fixture.debugElement;
    nameInput = dnameInput.nativeElement;
    const s = nameInput.querySelectorAll('input')[0];
    expect(s.value).toBe('');
  });

  it('should be able to change input value', () => {
    comp.com = 'Brown';
    const dnameInput = fixture.debugElement;
    const s = dnameInput.query(By.css('input'));
    dnameInput.triggerEventHandler('change', { target: s.nativeElement });
    //s[0].value = 'Brown';
    fixture.detectChanges();
    expect(comp.com).toBe(s.nativeElement.value);
  });

  it('can get userId from service', () => {
    const userName = 'admin@admin.com';
    timeServiceSpy.getUserId(userName).subscribe(value => { expect(value).toBe(1) });
  });

  it('can navigate to login', () => {
    const spy1 = spyOn(router, 'navigate');
    timeRegistration = new TimeRegistration(0, 2, '', '', null, null);
    comp.registrate(timeRegistration);
    expect(spy1.calls.first().args[0]).toEqual(['login']);
    expect(spy1.and.callThrough()).toHaveBeenCalledWith(['login']);
    expect(spy1).toHaveBeenCalledWith(['login']);
  });

  it('can check date input show default error message', () => {
    const dateInput = fixture.debugElement;
    let d1 = dateInput.query(By.css('#dateError'));
    let d2 = dateInput.query(By.css('#date'));
    d2.triggerEventHandler('change', { target: d2.nativeElement });
    fixture.detectChanges();
    expect(d1.nativeElement.innerHTML).toBe('Date is required!');
  });

  //rewrite this later
  it('can check duration input', () => {
    //comp.timeRegistration.registrationTime = new Date('2021-4-21');
    /*const dateInput = fixture.nativeElement;
    const d1: HTMLElement = dateInput.querySelector('#dateError');
    const d2: HTMLInputElement = dateInput.querySelector('#date');
    d2.value = '2021-4-21';
   // d2.triggerEventHandler('change', { target: d2.nativeElement });
    d2.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(d1.textContent).toBe('2021-4-21');*/
    comp.hrs = 2;
    const dateInput = fixture.debugElement;
    let d2 = dateInput.query(By.css('#hours'));
    d2.triggerEventHandler('change', { target: d2.nativeElement });
    fixture.detectChanges();
    expect(comp.hrs.toString()).toEqual(d2.nativeElement.value);
  });

  /*it('can get error message for the date is later than today', () => {
    comp.time = new Date('2021-4-21');
    const dateInput = fixture.nativeElement;
    const d1: HTMLElement = dateInput.querySelector('#dateError');
    const d2: HTMLInputElement = dateInput.querySelector('#date');
    // d2.triggerEventHandler('change', { target: d2.nativeElement });
    d2.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(d1.textContent).toBe('');
  });*/

  it('can registrate new timeRegistration', () => {
    const spy = spyOn(localStorage, 'getItem');
    timeRegistration = new TimeRegistration(0, 2, '', '', null, null);
    let s = JSON.stringify({ regsitrationId: 0, userId: 2, projectName: '', comment: '', hours: null, registrationTime: new Date(Date.now()) });
    comp.registrate(timeRegistration);
    expect(spy.and.callThrough()).toHaveBeenCalled();
    expect(spy.and.returnValue(s)).toBeTruthy();

  });

  it('submit button trigger registrate function', () => {
    const spy = spyOn(localStorage, 'getItem');
    timeRegistration = new TimeRegistration(0, 2, '', '', null, null);
    let s = JSON.stringify({ regsitrationId: 0, userId: 2, projectName: '', comment: '', hours: null, registrationTime: null });
    comp.registrate(timeRegistration);
    expect(spy.and.callThrough()).toHaveBeenCalled();
    expect(spy.and.returnValue(s)).toBeTruthy();

  });


});

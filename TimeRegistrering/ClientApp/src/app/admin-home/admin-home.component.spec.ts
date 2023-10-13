import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../user';

import { AdminHomeComponent } from './admin-home.component';

describe('AdminHomeComponent', () => {
  let comp: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let adminData: string;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('UserService', ['getAdminData']);
    TestBed.configureTestingModule({
      declarations: [AdminHomeComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService, AdminHomeComponent, { provide: UserService, userValue: spy }]
    });
    comp = TestBed.inject(AdminHomeComponent);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>; // AdminHomeComponent test instance
  }));

  it('fetchAdminData is defined after construction', () => {
    expect(comp.fetchAdminData).toBeDefined();
  });

  it('fetchAdminData is called on ngOnInit', () => {
    userServiceSpy.getAdminData().subscribe(value => { expect(value).toBe('This is an Admin uUser')});
  });

});

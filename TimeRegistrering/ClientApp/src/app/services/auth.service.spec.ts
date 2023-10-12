import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { UserRole } from '../role';
import { of } from 'rxjs';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;
  let router: Router;
  let location: Location;
  let userDetails: User;
 
  beforeEach(
    () => TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }, { path: 'userHome', component: UserHomeComponent }, { path: 'adminHome', component: AdminHomeComponent }]), HttpClientTestingModule]
    }));

  //httpClient = TestBed.inject(HttpClient);
 // httpTestingController = TestBed.inject(HttpTestingController);

 /* httpClient = TestBed.inject(HttpClient);
  httpTestingController = TestBed.inject(HttpTestingController);
  location = TestBed.inject(Location);
  authService = TestBed.inject(AuthService);
  router.initialNavigation();*/

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should call login', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.login(userDetails)).toBeTruthy();
  });

  it('should set userDetails', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service.setUserDetails).toBeDefined();
  });

  it('can logout', () => {
    const service: AuthService = TestBed.get(AuthService);
    const spy = jasmine.createSpyObj('AuthService', ['logout']);
    spy.logout();
    expect(spy.logout.calls.count()).toBe(1, 'logout is called once');
  });

});

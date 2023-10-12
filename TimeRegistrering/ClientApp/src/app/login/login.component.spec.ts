import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
 /* class MockRoute {
    queryParamMap: {
      returnUrl: ['userHome', 'adminHome', '/' ]
    }
  }

  class MockAuthService {
    authenticated = false;
    isAuthenticated() {
      return this.authenticated;
    }
  }*/
 
  let component: LoginComponent;
  /*let mockRoute: MockRoute;
  let authService: MockAuthService;*/
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])]
    });
    component = TestBed.inject(LoginComponent);

    it('should be created', () => {
      const service: AuthService = TestBed.get(AuthService);
      expect(service).toBeTruthy();
    });
  }));
});

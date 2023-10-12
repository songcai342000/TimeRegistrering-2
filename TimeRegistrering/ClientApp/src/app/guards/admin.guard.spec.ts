import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  class MockAuthService {

  }

  let adminGuar: AdminGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard],
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }]), HttpClientTestingModule]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});

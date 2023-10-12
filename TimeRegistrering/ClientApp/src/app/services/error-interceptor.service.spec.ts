import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorInterceptorService } from './error-interceptor.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ErrorInterceptorService],
    imports: [RouterTestingModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ErrorInterceptorService = TestBed.get(ErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimeService } from './time.service';
import { HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TimeService],
    imports: [RouterTestingModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service).toBeTruthy();
  });
});

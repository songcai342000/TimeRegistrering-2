import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    });
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance; // AdminHomeComponent test instance
      }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLoggedInComponent } from './navigation-logged-in.component';

describe('NavigationLoggedInComponent', () => {
  let component: NavigationLoggedInComponent;
  let fixture: ComponentFixture<NavigationLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

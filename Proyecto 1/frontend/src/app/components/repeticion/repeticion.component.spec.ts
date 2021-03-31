import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeticionComponent } from './repeticion.component';

describe('RepeticionComponent', () => {
  let component: RepeticionComponent;
  let fixture: ComponentFixture<RepeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

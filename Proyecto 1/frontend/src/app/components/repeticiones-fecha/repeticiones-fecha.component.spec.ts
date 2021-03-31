import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeticionesFechaComponent } from './repeticiones-fecha.component';

describe('RepeticionesFechaComponent', () => {
  let component: RepeticionesFechaComponent;
  let fixture: ComponentFixture<RepeticionesFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeticionesFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeticionesFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFalladoComponent } from './reporte-fallado.component';

describe('ReporteFalladoComponent', () => {
  let component: ReporteFalladoComponent;
  let fixture: ComponentFixture<ReporteFalladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteFalladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

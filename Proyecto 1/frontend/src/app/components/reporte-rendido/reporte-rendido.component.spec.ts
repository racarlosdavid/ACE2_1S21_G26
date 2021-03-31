import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRendidoComponent } from './reporte-rendido.component';

describe('ReporteRendidoComponent', () => {
  let component: ReporteRendidoComponent;
  let fixture: ComponentFixture<ReporteRendidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteRendidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteRendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanciaAcumuladaComponent } from './distancia-acumulada.component';

describe('DistanciaAcumuladaComponent', () => {
  let component: DistanciaAcumuladaComponent;
  let fixture: ComponentFixture<DistanciaAcumuladaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanciaAcumuladaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanciaAcumuladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanciaRepeticionComponent } from './distancia-repeticion.component';

describe('DistanciaRepeticionComponent', () => {
  let component: DistanciaRepeticionComponent;
  let fixture: ComponentFixture<DistanciaRepeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanciaRepeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanciaRepeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

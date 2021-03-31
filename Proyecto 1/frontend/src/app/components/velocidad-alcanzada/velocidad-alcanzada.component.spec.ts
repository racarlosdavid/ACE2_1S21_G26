import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocidadAlcanzadaComponent } from './velocidad-alcanzada.component';

describe('VelocidadAlcanzadaComponent', () => {
  let component: VelocidadAlcanzadaComponent;
  let fixture: ComponentFixture<VelocidadAlcanzadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VelocidadAlcanzadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocidadAlcanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

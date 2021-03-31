import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanciaActualComponent } from './distancia-actual.component';

describe('DistanciaActualComponent', () => {
  let component: DistanciaActualComponent;
  let fixture: ComponentFixture<DistanciaActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanciaActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanciaActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

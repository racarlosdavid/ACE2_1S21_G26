import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocidadComponent } from './velocidad.component';

describe('VelocidadComponent', () => {
  let component: VelocidadComponent;
  let fixture: ComponentFixture<VelocidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VelocidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

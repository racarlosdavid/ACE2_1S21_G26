import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorGolpesComponent } from './contador-golpes.component';

describe('ContadorGolpesComponent', () => {
  let component: ContadorGolpesComponent;
  let fixture: ComponentFixture<ContadorGolpesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadorGolpesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorGolpesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

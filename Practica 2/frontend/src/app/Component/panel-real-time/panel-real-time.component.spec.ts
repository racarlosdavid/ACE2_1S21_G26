import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRealTimeComponent } from './panel-real-time.component';

describe('PanelRealTimeComponent', () => {
  let component: PanelRealTimeComponent;
  let fixture: ComponentFixture<PanelRealTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRealTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRealTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

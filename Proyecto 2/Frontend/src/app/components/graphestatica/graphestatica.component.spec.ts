import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphestaticaComponent } from './graphestatica.component';

describe('GraphestaticaComponent', () => {
  let component: GraphestaticaComponent;
  let fixture: ComponentFixture<GraphestaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphestaticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphestaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

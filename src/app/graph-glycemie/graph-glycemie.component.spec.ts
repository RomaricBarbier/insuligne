import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGlycemieComponent } from './graph-glycemie.component';

describe('GraphGlycemieComponent', () => {
  let component: GraphGlycemieComponent;
  let fixture: ComponentFixture<GraphGlycemieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphGlycemieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphGlycemieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

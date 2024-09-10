import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabeteTypeComponent } from './diabete-type.component';

describe('DiabeteTypeComponent', () => {
  let component: DiabeteTypeComponent;
  let fixture: ComponentFixture<DiabeteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiabeteTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiabeteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

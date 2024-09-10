import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentationComponent } from './medicamentation.component';

describe('MedicamentationComponent', () => {
  let component: MedicamentationComponent;
  let fixture: ComponentFixture<MedicamentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicamentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

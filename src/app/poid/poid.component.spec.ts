import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoidComponent } from './poid.component';

describe('PoidComponent', () => {
  let component: PoidComponent;
  let fixture: ComponentFixture<PoidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

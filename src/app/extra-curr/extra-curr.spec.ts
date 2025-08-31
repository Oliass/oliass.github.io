import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraCurr } from './extra-curr';

describe('ExtraCurr', () => {
  let component: ExtraCurr;
  let fixture: ComponentFixture<ExtraCurr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraCurr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraCurr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSection } from './chart-section';

describe('ChartSection', () => {
  let component: ChartSection;
  let fixture: ComponentFixture<ChartSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

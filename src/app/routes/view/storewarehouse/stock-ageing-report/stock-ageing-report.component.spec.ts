import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAgeingReportComponent } from './stock-ageing-report.component';

describe('StockAgeingReportComponent', () => {
  let component: StockAgeingReportComponent;
  let fixture: ComponentFixture<StockAgeingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAgeingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAgeingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdjustmentReportComponent } from './stock-adjustment-report.component';

describe('StockAdjustmentReportComponent', () => {
  let component: StockAdjustmentReportComponent;
  let fixture: ComponentFixture<StockAdjustmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAdjustmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAdjustmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProfitReportComponent } from './invoice-profit-report.component';

describe('InvoiceProfitReportComponent', () => {
  let component: InvoiceProfitReportComponent;
  let fixture: ComponentFixture<InvoiceProfitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceProfitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceProfitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

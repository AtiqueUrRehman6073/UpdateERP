import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReportBaseUnitComponent } from './stock-report-base-unit.component';

describe('StockReportBaseUnitComponent', () => {
  let component: StockReportBaseUnitComponent;
  let fixture: ComponentFixture<StockReportBaseUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReportBaseUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReportBaseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

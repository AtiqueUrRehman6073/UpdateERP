import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseProfitReportComponent } from './item-wise-profit-report.component';

describe('ItemWiseProfitReportComponent', () => {
  let component: ItemWiseProfitReportComponent;
  let fixture: ComponentFixture<ItemWiseProfitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWiseProfitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWiseProfitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

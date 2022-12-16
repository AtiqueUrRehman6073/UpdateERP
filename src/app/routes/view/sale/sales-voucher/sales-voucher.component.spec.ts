import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVoucherComponent } from './sales-voucher.component';

describe('SalesVoucherComponent', () => {
  let component: SalesVoucherComponent;
  let fixture: ComponentFixture<SalesVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

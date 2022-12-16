import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEnquirySearchComponent } from './customer-enquiry-search.component';

describe('CustomerEnquirySearchComponent', () => {
  let component: CustomerEnquirySearchComponent;
  let fixture: ComponentFixture<CustomerEnquirySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEnquirySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEnquirySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

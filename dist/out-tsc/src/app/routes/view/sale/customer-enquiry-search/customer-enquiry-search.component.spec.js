import { async, TestBed } from '@angular/core/testing';
import { CustomerEnquirySearchComponent } from './customer-enquiry-search.component';
describe('CustomerEnquirySearchComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomerEnquirySearchComponent]
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
//# sourceMappingURL=customer-enquiry-search.component.spec.js.map
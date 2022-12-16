import { async, TestBed } from '@angular/core/testing';
import { InvoiceProfitReportComponent } from './invoice-profit-report.component';
describe('InvoiceProfitReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InvoiceProfitReportComponent]
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
//# sourceMappingURL=invoice-profit-report.component.spec.js.map
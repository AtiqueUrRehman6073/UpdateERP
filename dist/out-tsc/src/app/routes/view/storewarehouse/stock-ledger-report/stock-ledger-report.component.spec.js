import { async, TestBed } from '@angular/core/testing';
import { StockLedgerReportComponent } from './stock-ledger-report.component';
describe('StockLedgerReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockLedgerReportComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(StockLedgerReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stock-ledger-report.component.spec.js.map
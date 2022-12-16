import { async, TestBed } from '@angular/core/testing';
import { StockAdjustmentReportComponent } from './stock-adjustment-report.component';
describe('StockAdjustmentReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockAdjustmentReportComponent]
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
//# sourceMappingURL=stock-adjustment-report.component.spec.js.map
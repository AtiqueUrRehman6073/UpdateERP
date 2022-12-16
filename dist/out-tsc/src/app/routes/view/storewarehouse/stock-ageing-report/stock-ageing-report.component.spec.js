import { async, TestBed } from '@angular/core/testing';
import { StockAgeingReportComponent } from './stock-ageing-report.component';
describe('StockAgeingReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockAgeingReportComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(StockAgeingReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stock-ageing-report.component.spec.js.map
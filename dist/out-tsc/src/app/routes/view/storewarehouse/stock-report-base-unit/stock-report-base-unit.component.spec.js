import { async, TestBed } from '@angular/core/testing';
import { StockReportBaseUnitComponent } from './stock-report-base-unit.component';
describe('StockReportBaseUnitComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockReportBaseUnitComponent]
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
//# sourceMappingURL=stock-report-base-unit.component.spec.js.map
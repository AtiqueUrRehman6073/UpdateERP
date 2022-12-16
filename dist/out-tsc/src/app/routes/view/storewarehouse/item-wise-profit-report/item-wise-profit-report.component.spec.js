import { async, TestBed } from '@angular/core/testing';
import { ItemWiseProfitReportComponent } from './item-wise-profit-report.component';
describe('ItemWiseProfitReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemWiseProfitReportComponent]
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
//# sourceMappingURL=item-wise-profit-report.component.spec.js.map
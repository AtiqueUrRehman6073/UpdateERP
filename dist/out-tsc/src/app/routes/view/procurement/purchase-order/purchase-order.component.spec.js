import { async, TestBed } from '@angular/core/testing';
import { PurchaseOrderComponent } from './purchase-order.component';
describe('PurchaseOrderComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PurchaseOrderComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=purchase-order.component.spec.js.map
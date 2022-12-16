import { async, TestBed } from '@angular/core/testing';
import { PurchaseOrderListComponent } from './purchase-order-list.component';
describe('PurchaseOrderListComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PurchaseOrderListComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseOrderListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=purchase-order-list.component.spec.js.map
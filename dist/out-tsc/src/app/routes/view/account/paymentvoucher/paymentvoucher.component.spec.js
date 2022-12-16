import { async, TestBed } from '@angular/core/testing';
import { PaymentvoucherComponent } from './paymentvoucher.component';
describe('PaymentvoucherComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentvoucherComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentvoucherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=paymentvoucher.component.spec.js.map
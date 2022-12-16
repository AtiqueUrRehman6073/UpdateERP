import { async, TestBed } from '@angular/core/testing';
import { ReceiptvoucherComponent } from './receiptvoucher.component';
describe('ReceiptvoucherComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReceiptvoucherComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ReceiptvoucherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=receiptvoucher.component.spec.js.map
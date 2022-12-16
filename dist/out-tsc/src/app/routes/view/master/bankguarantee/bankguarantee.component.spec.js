import { async, TestBed } from '@angular/core/testing';
import { BankguaranteeComponent } from './bankguarantee.component';
describe('BankguaranteeComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BankguaranteeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BankguaranteeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bankguarantee.component.spec.js.map
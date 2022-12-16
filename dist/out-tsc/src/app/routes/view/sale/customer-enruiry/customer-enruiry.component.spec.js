import { async, TestBed } from '@angular/core/testing';
import { CustomerEnruiryComponent } from './customer-enruiry.component';
describe('CustomerEnruiryComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomerEnruiryComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerEnruiryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=customer-enruiry.component.spec.js.map
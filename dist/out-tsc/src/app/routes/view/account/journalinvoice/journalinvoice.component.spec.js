import { async, TestBed } from '@angular/core/testing';
import { JournalinvoiceComponent } from './journalinvoice.component';
describe('JournalinvoiceComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JournalinvoiceComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(JournalinvoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=journalinvoice.component.spec.js.map
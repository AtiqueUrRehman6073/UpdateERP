import { async, TestBed } from '@angular/core/testing';
import { AccountmanualcodeentryComponent } from './accountmanualcodeentry.component';
describe('AccountmanualcodeentryComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountmanualcodeentryComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AccountmanualcodeentryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=accountmanualcodeentry.component.spec.js.map
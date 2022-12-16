import { async, TestBed } from '@angular/core/testing';
import { DepreciationregisterComponent } from './depreciationregister.component';
describe('DepreciationregisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DepreciationregisterComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DepreciationregisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=depreciationregister.component.spec.js.map
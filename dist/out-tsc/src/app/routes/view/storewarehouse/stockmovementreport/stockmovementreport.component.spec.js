import { async, TestBed } from '@angular/core/testing';
import { StockmovementreportComponent } from './stockmovementreport.component';
describe('StockmovementreportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StockmovementreportComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(StockmovementreportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stockmovementreport.component.spec.js.map
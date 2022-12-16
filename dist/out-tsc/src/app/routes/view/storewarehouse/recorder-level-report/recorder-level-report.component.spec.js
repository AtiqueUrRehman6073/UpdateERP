import { async, TestBed } from '@angular/core/testing';
import { RecorderLevelReportComponent } from './recorder-level-report.component';
describe('RecorderLevelReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecorderLevelReportComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RecorderLevelReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=recorder-level-report.component.spec.js.map
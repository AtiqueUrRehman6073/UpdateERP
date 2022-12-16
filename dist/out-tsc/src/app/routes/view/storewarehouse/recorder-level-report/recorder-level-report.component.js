import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RecorderLevelReportComponent = class RecorderLevelReportComponent {
    constructor(router, activatedroute) {
        this.router = router;
        this.activatedroute = activatedroute;
        this.index = 0;
    }
    ngOnInit() {
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
    handleChange(e) {
        this.index = e.index;
    }
};
RecorderLevelReportComponent = __decorate([
    Component({
        selector: 'app-recorder-level-report',
        templateUrl: './recorder-level-report.component.html',
        styleUrls: ['./recorder-level-report.component.scss']
    })
], RecorderLevelReportComponent);
export { RecorderLevelReportComponent };
//# sourceMappingURL=recorder-level-report.component.js.map
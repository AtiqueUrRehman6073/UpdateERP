import { __decorate } from "tslib";
import { Component } from '@angular/core';
let StockAdjustmentReportComponent = class StockAdjustmentReportComponent {
    constructor(router, activatedroute) {
        this.router = router;
        this.activatedroute = activatedroute;
    }
    ngOnInit() {
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
StockAdjustmentReportComponent = __decorate([
    Component({
        selector: 'app-stock-adjustment-report',
        templateUrl: './stock-adjustment-report.component.html',
        styleUrls: ['./stock-adjustment-report.component.scss']
    })
], StockAdjustmentReportComponent);
export { StockAdjustmentReportComponent };
//# sourceMappingURL=stock-adjustment-report.component.js.map
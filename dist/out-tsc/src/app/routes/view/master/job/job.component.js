import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let JobComponent = class JobComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.displayedColumns = ['CheckAll', 'Description', 'Qty', 'Unit', 'Status', 'RefNo', 'actionsColumn'];
        this.displayedColumns2 = ['budget', 'amount', 'actionsColumn'];
        this.jobbudgetList = [
            { budget: 'cars', amount: 200 },
            { budget: 'cars2', amount: 200 }, { budget: 'cars', amount: 200 },
            { budget: 'cars2', amount: 200 }
        ];
        this.jobScopeList = [
            {
                isTrue: true,
                description: 'desc 1',
                qty: 5,
                unit: 12,
                status: 'Active',
                refno: 1234556
            },
            {
                isTrue: true,
                description: 'desc 1',
                qty: 5,
                unit: 12,
                status: 'Active',
                refno: 1234556
            }
        ];
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
__decorate([
    Input()
], JobComponent.prototype, "jobbudgetList", void 0);
__decorate([
    Input()
], JobComponent.prototype, "jobScopeList", void 0);
JobComponent = __decorate([
    Component({
        selector: 'app-job',
        templateUrl: './job.component.html',
        styleUrls: ['./job.component.scss']
    })
], JobComponent);
export { JobComponent };
//# sourceMappingURL=job.component.js.map
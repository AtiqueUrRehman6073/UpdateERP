import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ChartofaccountComponent = class ChartofaccountComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
ChartofaccountComponent = __decorate([
    Component({
        selector: 'app-chartofaccount',
        templateUrl: './chartofaccount.component.html',
        styleUrls: ['./chartofaccount.component.scss']
    })
], ChartofaccountComponent);
export { ChartofaccountComponent };
//# sourceMappingURL=chartofaccount.component.js.map
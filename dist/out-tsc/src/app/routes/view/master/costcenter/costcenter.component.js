import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CostcenterComponent = class CostcenterComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.displayedColumns = ['code', 'description', 'action'];
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
CostcenterComponent = __decorate([
    Component({
        selector: 'app-costcenter',
        templateUrl: './costcenter.component.html',
        styleUrls: ['./costcenter.component.scss']
    })
], CostcenterComponent);
export { CostcenterComponent };
//# sourceMappingURL=costcenter.component.js.map
import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PricelevelComponent = class PricelevelComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.displayedColumns = ['id', 'name'];
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
PricelevelComponent = __decorate([
    Component({
        selector: 'app-pricelevel',
        templateUrl: './pricelevel.component.html',
        styleUrls: ['./pricelevel.component.scss']
    })
], PricelevelComponent);
export { PricelevelComponent };
//# sourceMappingURL=pricelevel.component.js.map
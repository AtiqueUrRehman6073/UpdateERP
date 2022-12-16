import { __decorate } from "tslib";
import { Component } from '@angular/core';
let JobtypeComponent = class JobtypeComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
JobtypeComponent = __decorate([
    Component({
        selector: 'app-jobtype',
        templateUrl: './jobtype.component.html',
        styleUrls: ['./jobtype.component.scss']
    })
], JobtypeComponent);
export { JobtypeComponent };
//# sourceMappingURL=jobtype.component.js.map
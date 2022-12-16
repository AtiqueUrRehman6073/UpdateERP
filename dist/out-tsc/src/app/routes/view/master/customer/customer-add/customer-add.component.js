import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CustomerAddComponent = class CustomerAddComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
CustomerAddComponent = __decorate([
    Component({
        selector: 'app-customer-add',
        templateUrl: './customer-add.component.html',
        styleUrls: ['./customer-add.component.scss']
    })
], CustomerAddComponent);
export { CustomerAddComponent };
//# sourceMappingURL=customer-add.component.js.map
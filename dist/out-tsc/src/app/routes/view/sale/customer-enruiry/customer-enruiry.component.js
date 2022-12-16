import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CustomerEnruiryComponent = class CustomerEnruiryComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.title = '';
        this.index = 0;
        this.customerNameList = ['---Select Customer Name---'];
        this.enquiryList = ['---Select Customer Name---'];
        this.businessTypeList = ['---Select Customer Name---'];
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
    handleChange(e) {
        this.index = e.index;
    }
};
CustomerEnruiryComponent = __decorate([
    Component({
        selector: 'app-customer-enruiry',
        templateUrl: './customer-enruiry.component.html',
        styleUrls: ['./customer-enruiry.component.scss']
    })
], CustomerEnruiryComponent);
export { CustomerEnruiryComponent };
//# sourceMappingURL=customer-enruiry.component.js.map
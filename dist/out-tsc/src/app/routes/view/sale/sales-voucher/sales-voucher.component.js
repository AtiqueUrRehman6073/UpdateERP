import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { defaults } from 'src/app/shared/service/settings';
let SalesVoucherComponent = class SalesVoucherComponent {
    constructor(activatedroute, stockApi, messageService, fb, confirmation, translate, router, masterapi, accountapi) {
        this.activatedroute = activatedroute;
        this.stockApi = stockApi;
        this.messageService = messageService;
        this.fb = fb;
        this.confirmation = confirmation;
        this.translate = translate;
        this.router = router;
        this.masterapi = masterapi;
        this.accountapi = accountapi;
        this.licensekey = defaults.hotlicensekey;
    }
    ngOnInit() {
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
SalesVoucherComponent = __decorate([
    Component({
        selector: 'app-sales-voucher',
        templateUrl: './sales-voucher.component.html',
        styleUrls: ['./sales-voucher.component.scss']
    })
], SalesVoucherComponent);
export { SalesVoucherComponent };
//# sourceMappingURL=sales-voucher.component.js.map
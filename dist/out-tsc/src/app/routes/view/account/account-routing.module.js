import { __decorate } from "tslib";
import { JournalinvoiceComponent } from './journalinvoice/journalinvoice.component';
import { ReceiptvoucherComponent } from './receiptvoucher/receiptvoucher.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentvoucherComponent } from './paymentvoucher/paymentvoucher.component';
const routes = [
    {
        path: 'paymentvoucher',
        component: PaymentvoucherComponent,
        data: { title: 'Payment Voucher', titleI18n: 'Payment Voucher' }
    },
    {
        path: 'receiptvoucher',
        component: ReceiptvoucherComponent,
        data: { title: 'Receipt Voucher', titleI18n: 'Receipt Voucher' }
    },
    {
        path: 'journalinvoice',
        component: JournalinvoiceComponent,
        data: { title: 'Journal Invoice', titleI18n: 'Journal Invoice' }
    }
];
let AccountRoutingModule = class AccountRoutingModule {
};
AccountRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AccountRoutingModule);
export { AccountRoutingModule };
//# sourceMappingURL=account-routing.module.js.map
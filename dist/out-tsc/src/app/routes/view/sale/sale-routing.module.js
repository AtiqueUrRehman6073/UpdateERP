import { __decorate } from "tslib";
import { CustomerquotationComponent } from './customerquotation/customerquotation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalesVoucherComponent } from './sales-voucher/sales-voucher.component';
import { CustomerEnquirySearchComponent } from './customer-enquiry-search/customer-enquiry-search.component';
const routes = [
    {
        path: 'customerquotation',
        component: CustomerquotationComponent,
        data: { title: 'Customer Quotation', titleI18n: 'Customer Quotation' }
    },
    {
        path: 'salesvoucher',
        component: SalesVoucherComponent,
        data: { title: 'Sales Voucher', titleI18n: 'Sales Voucher' }
    },
    {
        path: 'customer-enquiry-search',
        component: CustomerEnquirySearchComponent,
        data: { title: 'Cusotmer Enquiry Search', titleI18n: 'Cusotmer Enquiry Search' }
    }
];
let SaleRoutingModule = class SaleRoutingModule {
};
SaleRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], SaleRoutingModule);
export { SaleRoutingModule };
//# sourceMappingURL=sale-routing.module.js.map
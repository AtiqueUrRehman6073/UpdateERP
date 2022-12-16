import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
const routes = [
    { path: 'PurchaseOrder', component: PurchaseOrderComponent }
];
let ProcurementRoutingModule = class ProcurementRoutingModule {
};
ProcurementRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProcurementRoutingModule);
export { ProcurementRoutingModule };
//# sourceMappingURL=procurement-routing.module.js.map
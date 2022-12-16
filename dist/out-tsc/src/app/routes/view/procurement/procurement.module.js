import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementRoutingModule } from './procurement-routing.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
let ProcurementModule = class ProcurementModule {
};
ProcurementModule = __decorate([
    NgModule({
        declarations: [PurchaseOrderComponent],
        imports: [
            CommonModule,
            ProcurementRoutingModule
        ]
    })
], ProcurementModule);
export { ProcurementModule };
//# sourceMappingURL=procurement.module.js.map
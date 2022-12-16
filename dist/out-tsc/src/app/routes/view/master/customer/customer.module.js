import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    NgModule({
        declarations: [CustomerAddComponent, CustomerViewComponent],
        imports: [
            CommonModule,
            CustomerRoutingModule,
            SharedModule
        ]
    })
], CustomerModule);
export { CustomerModule };
//# sourceMappingURL=customer.module.js.map
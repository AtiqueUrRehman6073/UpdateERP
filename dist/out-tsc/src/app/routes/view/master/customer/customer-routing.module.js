import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
const routes = [
    {
        path: 'add',
        component: CustomerAddComponent,
        data: { title: 'Add Customer', titleI18n: 'Add Customer' },
    },
    {
        path: 'view',
        component: CustomerViewComponent,
        data: { title: 'View Customer', titleI18n: 'View Customer' },
    },
];
let CustomerRoutingModule = class CustomerRoutingModule {
};
CustomerRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CustomerRoutingModule);
export { CustomerRoutingModule };
//# sourceMappingURL=customer-routing.module.js.map
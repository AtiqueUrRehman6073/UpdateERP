import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { ListComponent } from './list/list.component';
const routes = [{
        path: '',
        redirectTo: 'list'
    }, {
        path: 'entry/:id',
        component: EntryComponent,
        data: { title: 'Item Master Entry', titleI18n: 'Item Master Entry' }
    }, {
        path: 'list',
        component: ListComponent,
        data: { title: 'Item Master List', titleI18n: 'Item Master List' }
    }];
let ItemMasterRoutingModule = class ItemMasterRoutingModule {
};
ItemMasterRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ItemMasterRoutingModule);
export { ItemMasterRoutingModule };
//# sourceMappingURL=item-master-routing.module.js.map
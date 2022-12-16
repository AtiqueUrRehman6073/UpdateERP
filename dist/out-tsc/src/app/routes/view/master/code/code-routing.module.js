import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { MakeComponent } from './make/make.component';
import { TypeComponent } from './type/type.component';
import { UnitComponent } from './unit/unit.component';
const routes = [
    {
        path: 'equipment',
        component: EquipmentComponent,
        data: { title: 'Equipment Master', titleI18n: 'Equipment Master' },
    },
    {
        path: 'make',
        component: MakeComponent,
        data: { title: 'Make Master', titleI18n: 'Make Master' },
    },
    {
        path: 'type',
        component: TypeComponent,
        data: { title: 'Type Master', titleI18n: 'Make Master' },
    },
    {
        path: 'unit',
        component: UnitComponent,
        data: { title: 'Unit Master', titleI18n: 'Make Master' },
    },
];
let CodeRoutingModule = class CodeRoutingModule {
};
CodeRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CodeRoutingModule);
export { CodeRoutingModule };
//# sourceMappingURL=code-routing.module.js.map
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeRoutingModule } from './code-routing.module';
import { EquipmentComponent } from './equipment/equipment.component';
import { UnitComponent } from './unit/unit.component';
import { MakeComponent } from './make/make.component';
import { TypeComponent } from './type/type.component';
let CodeModule = class CodeModule {
};
CodeModule = __decorate([
    NgModule({
        declarations: [EquipmentComponent, UnitComponent, MakeComponent, TypeComponent],
        imports: [
            CommonModule,
            CodeRoutingModule
        ]
    })
], CodeModule);
export { CodeModule };
//# sourceMappingURL=code.module.js.map
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { PrimeModuleModule } from '../shared/module/prime-module/prime-module.module';
const COMPONENTS = [DashboardComponent];
const COMPONENTS_DYNAMIC = [];
let RoutesModule = class RoutesModule {
};
RoutesModule = __decorate([
    NgModule({
        imports: [SharedModule, RoutesRoutingModule, PrimeModuleModule],
        declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
        entryComponents: COMPONENTS_DYNAMIC,
    })
], RoutesModule);
export { RoutesModule };
//# sourceMappingURL=routes.module.js.map
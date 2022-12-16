import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DamageEntryComponent } from './view/damage-entry/damage-entry.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
const routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
    },
    {
        path: 'master',
        loadChildren: () => import('./view/master/master.module').then(ma => ma.MasterModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./view/account/account.module').then(ac => ac.AccountModule)
    },
    {
        path: 'administration',
        loadChildren: () => import('./view/administration/administration.module').then(ad => ad.AdministrationModule)
    },
    {
        path: 'misreport',
        loadChildren: () => import('./view/misreport/misreport.module').then(mi => mi.MisreportModule)
    },
    {
        path: 'procurement',
        loadChildren: () => import('./view/procurement/procurement.module').then(pr => pr.ProcurementModule)
    },
    {
        path: 'sale',
        loadChildren: () => import('./view/sale/sale.module').then(sa => sa.SaleModule)
    },
    {
        path: 'storewarehouse',
        loadChildren: () => import('./view/storewarehouse/storewarehouse.module').then(se => se.StorewarehouseModule)
    },
    {
        path: 'damageentry',
        component: DamageEntryComponent,
        data: { title: 'Damge Entry', titleI18n: 'damageEntry' },
    },
    { path: '**', redirectTo: '' },
];
let RoutesRoutingModule = class RoutesRoutingModule {
};
RoutesRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, {
                useHash: true,
            }),
        ],
        exports: [RouterModule],
    })
], RoutesRoutingModule);
export { RoutesRoutingModule };
//# sourceMappingURL=routes-routing.module.js.map
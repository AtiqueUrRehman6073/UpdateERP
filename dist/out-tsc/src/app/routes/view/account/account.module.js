import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { PaymentvoucherComponent } from './paymentvoucher/paymentvoucher.component';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HotTableModule } from '@handsontable/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReceiptvoucherComponent } from './receiptvoucher/receiptvoucher.component';
import { JournalinvoiceComponent } from './journalinvoice/journalinvoice.component';
let AccountModule = class AccountModule {
};
AccountModule = __decorate([
    NgModule({
        declarations: [PaymentvoucherComponent, ReceiptvoucherComponent, JournalinvoiceComponent],
        imports: [
            CommonModule,
            AccountRoutingModule,
            SharedModule,
            TranslateModule,
            PrimeModuleModule,
            ReactiveFormsModule,
            HotTableModule,
            FormsModule
        ],
    })
], AccountModule);
export { AccountModule };
//# sourceMappingURL=account.module.js.map
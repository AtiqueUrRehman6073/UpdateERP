import { NgModule } from '@angular/core';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './../account/account-routing.module';
import { CommonModule } from '@angular/common';
import { SaleRoutingModule } from './sale-routing.module';
import { CustomerquotationComponent } from './customerquotation/customerquotation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';
import { SalesVoucherComponent } from './sales-voucher/sales-voucher.component';
import { CustomerEnquirySearchComponent } from './customer-enquiry-search/customer-enquiry-search.component';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
  declarations: [CustomerquotationComponent, SalesVoucherComponent, CustomerEnquirySearchComponent],
  imports: [
    SaleRoutingModule,
    CommonModule,
    SharedModule,
    PrimeModuleModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    HotTableModule,
    ListboxModule
  ]
})
export class SaleModule { }

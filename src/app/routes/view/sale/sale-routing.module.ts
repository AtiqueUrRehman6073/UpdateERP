import { CustomerquotationComponent } from './customerquotation/customerquotation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesVoucherComponent } from './sales-voucher/sales-voucher.component';
import { CustomerEnquirySearchComponent } from './customer-enquiry-search/customer-enquiry-search.component';


const routes: Routes = [
  {
    path: 'customerquotation',
    component: CustomerquotationComponent,
    data: { title: 'Customer Quotation', titleI18n: 'Customer Quotation' }
  },
  {
    path: 'salesvoucher',
    component: SalesVoucherComponent,
    data: { title: 'Sales Voucher', titleI18n: 'Sales Voucher' }
  },
  {
    path: 'customer-enquiry-search',
    component: CustomerEnquirySearchComponent,
    data: { title: 'Cusotmer Enquiry Search', titleI18n: 'Cusotmer Enquiry Search' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }

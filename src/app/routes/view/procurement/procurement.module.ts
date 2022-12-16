import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementRoutingModule } from './procurement-routing.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';


@NgModule({
  declarations: [PurchaseOrderComponent],
  imports: [
    CommonModule,
    ProcurementRoutingModule
  ]
})
export class ProcurementModule { }

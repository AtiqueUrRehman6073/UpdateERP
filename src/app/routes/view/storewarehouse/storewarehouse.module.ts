import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorewarehouseRoutingModule } from './storewarehouse-routing.module';
import { SharedModule } from 'primeng';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HotTableModule } from '@handsontable/angular';
import { StockLedgerReportComponent } from './stock-ledger-report/stock-ledger-report.component';
import { StockmovementreportComponent } from './stockmovementreport/stockmovementreport.component';
import { StockLedgerComponent } from './stock-ledger/stock-ledger.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { StockReportBaseUnitComponent } from './stock-report-base-unit/stock-report-base-unit.component';
import { StockMovementComponent } from './stock-movement/stock-movement.component';
import { StockAdjustmentReportComponent } from './stock-adjustment-report/stock-adjustment-report.component';
import { RecorderLevelReportComponent } from './recorder-level-report/recorder-level-report.component';
import { BOMStatusComponent } from './bomstatus/bomstatus.component';
import { IssueReportComponent } from './issue-report/issue-report.component';
import { InvoiceProfitReportComponent } from './invoice-profit-report/invoice-profit-report.component';
import { StockAgeingReportComponent } from './stock-ageing-report/stock-ageing-report.component';
import { ItemWiseProfitReportComponent } from './item-wise-profit-report/item-wise-profit-report.component';
import {ListboxModule} from 'primeng/listbox';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { DamageEntryComponent } from '../damage-entry/damage-entry.component';

@NgModule({
  declarations: [StockLedgerReportComponent, StockmovementreportComponent, StockLedgerComponent, StockReportComponent, StockReportBaseUnitComponent, StockMovementComponent, StockAdjustmentReportComponent, RecorderLevelReportComponent, BOMStatusComponent, IssueReportComponent, InvoiceProfitReportComponent, StockAgeingReportComponent, ItemWiseProfitReportComponent, StockTransferComponent, DamageEntryComponent],
  imports: [
    CommonModule,
    StorewarehouseRoutingModule,
    SharedModule,
    PrimeModuleModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    HotTableModule,
    ListboxModule
  ]
})
export class StorewarehouseModule { }

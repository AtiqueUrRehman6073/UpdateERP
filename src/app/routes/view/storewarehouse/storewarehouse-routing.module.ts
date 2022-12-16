import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockLedgerReportComponent } from './stock-ledger-report/stock-ledger-report.component';
import { StockLedgerComponent } from './stock-ledger/stock-ledger.component';
import { StockmovementreportComponent } from './stockmovementreport/stockmovementreport.component';
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
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';

const routes: Routes = [
  {
    path: 'stockledgerreport',
    component: StockLedgerReportComponent,
    data: { title: 'Stock Ledger Report', titleI18n: 'Stock Ledger Report' },
  },
  {
    path: 'stockmovementreport',
    component: StockmovementreportComponent,
    data: { title: 'Stock Movement Report', titleI18n: 'Stock Movement Report' },
  },
  {
    path: 'stockledger',
    component: StockLedgerComponent,
    data: { title: 'Stock Ledger', titleI18n: 'Stock Ledger' },
  },
  {
    path: 'stockreport',
    component: StockReportComponent,
    data: { title: 'Stock Report', titleI18n: 'Stock Report' },
  },
  {
    path: 'stockreportbaseunit',
    component: StockReportBaseUnitComponent,
    data: { title: 'Stock Report (Base Unit)', titleI18n: 'Stock Report (Base Unit)' },
  },
  {
    path: 'stockmovement',
    component: StockMovementComponent,
    data: { title: 'Stock Movement', titleI18n: 'Stock Movement' },
  },
  {
    path: 'stockadjustmentreport',
    component: StockAdjustmentReportComponent,
    data: { title: 'Stock Adjustment Report', titleI18n: 'Stock Adjustment Report' },
  },
  {
    path: 'recorderlevelreport',
    component: RecorderLevelReportComponent,
    data: { title: 'Recorder Level Report', titleI18n: 'Recorder Level Report' },
  },
  {
    path: 'bomstatus',
    component: BOMStatusComponent,
    data: { title: 'BOM Status', titleI18n: 'BOM Status' },
  },
  {
    path: 'issuereport',
    component: IssueReportComponent,
    data: { title: 'Issue Report', titleI18n: 'Issue Report' },
  },
  {
    path: 'invoiceprofitreport',
    component: InvoiceProfitReportComponent,
    data: { title: 'Invoice Profit Report', titleI18n: 'Invoice Profit Report' },
  },
  {
    path: 'stockageingreport',
    component: StockAgeingReportComponent,
    data: { title: 'Stock Ageing Report', titleI18n: 'Stock Ageing Report' },
  },
  {
    path: 'itemwiseprofitreport',
    component: ItemWiseProfitReportComponent,
    data: { title: 'Item Wise Profit Report', titleI18n: 'Item Wise Profit Report' },
  },
  {
    path: 'stocktransfer',
    component: StockTransferComponent,
    data: { title: 'Stock Transfer', titleI18n: 'Stock Transfer' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorewarehouseRoutingModule { }

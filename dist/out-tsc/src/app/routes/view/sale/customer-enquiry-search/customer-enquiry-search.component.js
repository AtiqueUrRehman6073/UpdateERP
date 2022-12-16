import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { defaults } from 'src/app/shared/service/settings';
let CustomerEnquirySearchComponent = class CustomerEnquirySearchComponent {
    constructor(activatedroute, translate, messageService, stockApi) {
        this.activatedroute = activatedroute;
        this.translate = translate;
        this.messageService = messageService;
        this.stockApi = stockApi;
        this.title = '';
        this.index = 0;
        this.report = [];
        this.customerNameList = ['---Select Customer Name---'];
        this.hotid = 'stockLedgerReport';
        this.dataset = [];
        this.licensekey = defaults.hotlicensekey;
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.initializeControls();
        //this.getcustomerEnquiryReport();
    }
    initializeControls() {
        this.customerEnquirySearch = {
            rowHeaders: true,
            viewportColumnRenderingOffset: 27,
            viewportRowRenderingOffset: 'auto',
            colWidths: undefined,
            minRows: 3,
            width: '100%',
            height: 150,
            rowHeights: 23,
            fillHandle: {
                direction: 'vertical',
                autoInsertRow: true
            },
            // afterOnCellMouseDown: (event, coords, TD) => {
            //   if ((TD.innerText === null || isNaN(parseInt(TD.innerText))) && this.conditionCheck)
            //     return;
            //   this.getAllItems();
            //   this.conditionCheck = true;
            // },
            // afterChange: (changes) => {
            //   changes?.forEach(([row, prop, oldValue, newValue]) => {
            //     this.stockQuantity = newValue;
            //   });
            // },
            data: [],
            minSpareRows: 1,
            allowInsertRow: true,
            // allowInsertColumn: false,
            // allowRemoveColumn: false,
            // allowRemoveRow: false,
            // autoWrapRow: false,
            // autoWrapCol: false,
            //  autoWrapRow: true,
            // height: 487,
            // maxRows: 22,
            stretchH: "all",
            manualRowResize: true,
            manualColumnResize: true,
            hiddenColumns: {
                columns: [5],
                indicators: false
            },
            columns: [
                {
                    data: 'Item',
                    type: 'numeric'
                },
                {
                    data: 'itemName',
                    type: 'text'
                },
                {
                    data: 'itemType',
                    type: 'text'
                },
                {
                    data: 'quantity',
                    type: 'text',
                }
            ],
            colHeaders: [
                this.translate.instant('Item'),
                this.translate.instant('Item Name'),
                this.translate.instant('Item Type'),
                this.translate.instant('Quantity')
            ],
            manualRowMove: true,
            manualColumnMove: true,
            contextMenu: true,
            filters: true,
            dropdownMenu: true,
        };
        // this.stockTransfer.beforeChangeRender = (change, source) => {
        //   this.ColumnSum();
        // };
        // this.stockTransfer.afterRemoveRow = (index: number, amount: number) => {
        //   // console.log('beforeRemove: index: %d, amount: %d', index, amount);
        //   // console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
        //   this.ColumnSum();
        // };
        this.customerEnquirySearch.afterValidate = (isValid, value, row, prop) => {
            if (!isValid) {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
            }
        };
    }
    getcustomerEnquiryReport() {
        this.stockApi.customerEnquiryReport().subscribe(data => {
            console.log(data);
            this.report = data;
            this.dataset = this.report.Enquiry_Master;
        });
    }
};
CustomerEnquirySearchComponent = __decorate([
    Component({
        selector: 'app-customer-enquiry-search',
        templateUrl: './customer-enquiry-search.component.html',
        styleUrls: ['./customer-enquiry-search.component.scss']
    })
], CustomerEnquirySearchComponent);
export { CustomerEnquirySearchComponent };
//# sourceMappingURL=customer-enquiry-search.component.js.map
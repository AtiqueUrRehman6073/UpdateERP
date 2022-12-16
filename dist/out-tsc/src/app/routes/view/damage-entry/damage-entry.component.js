import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { defaults } from 'src/app/shared/service/settings';
import { HotTableRegisterer } from '@handsontable/angular';
import { DropDownValidator } from 'src/app/shared/validator/customvalidtor';
let DamageEntryComponent = class DamageEntryComponent {
    constructor(activatedroute, service, messageService, fb, confirmation, translate, router, masterapi, accountapi) {
        this.activatedroute = activatedroute;
        this.service = service;
        this.messageService = messageService;
        this.fb = fb;
        this.confirmation = confirmation;
        this.translate = translate;
        this.router = router;
        this.masterapi = masterapi;
        this.accountapi = accountapi;
        this.confirmDropDatabaseDialogVisible = false;
        this.index = 0;
        this.currArry = [];
        this.accountArray = [];
        this.acctArry = [];
        this.jobArray = [];
        this.jobList = [];
        this.jobArry = [];
        this.costcenterArray = [];
        this.costcenterList = [];
        this.costcenterArry = [];
        this.accountTransactionList = [];
        this.receiptVoucherarry = [];
        this.hotRegisterer = new HotTableRegisterer();
        this.hotid = 'receiptVouchrEntry';
        this.licensekey = defaults.hotlicensekey;
    }
    ngOnInit() {
        this.cols = [
            { field: 'Item_Master_Item_ID', header: 'Item Id' },
            { field: 'Item_Master_Item_Name', header: 'Item Name' },
            { field: 'Item_Master_Part_No', header: 'Item Part No' },
            { field: 'Item_Master_Barcode', header: 'Item Barcode' }
        ];
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.initializeControls();
        this.getAllLocations();
        this.stockMovementRptFormGroup = this.fb.group({
            ReceiptVoucherMasterSNO: [null],
            ReceiptVoucherMasterVoucherNo: [{ value: null, disabled: true }],
            ReceiptVoucherMasterVoucherDate: [null, [Validators.required]],
            ReceiptVoucherMasterRefNo: ['', [Validators.required]],
            ReceiptVoucherMasterDrAcNo: [-1, [DropDownValidator]],
            ReceiptVoucherMasterDrAmount: [null],
            ReceiptVoucherMasterNarration: ['', [Validators.required]],
            ReceiptVoucherMasterCurrencyId: [-1, [DropDownValidator]]
        });
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
    GetItemList() {
        console.log('called');
        this.service.getAllItemsList().subscribe(respose => {
            this.list = respose;
            console.log(this.list);
            this.dataset = this.list.Item_Master;
            this.displayMaximizable = true;
        }, error => {
            console.error("Data Not found...!");
        });
    }
    GetItemDetails(id) {
        this.displayMaximizable = false;
        this.service.getStockMovementDetailsRpt({ ItemMasterItemId: id }).subscribe(respose => {
            this.list = respose;
            this.dataset = this.list.ItemDetails;
            console.error(this.dataset);
        }, error => {
            console.error("Data Not found...!");
        });
    }
    handleChange(e) {
        this.index = e.index;
    }
    get f() {
        return this.stockMovementRptFormGroup.controls;
    }
    getAllLocations() {
        this.masterapi.GetAllLocation().subscribe(data => {
            this.locationList = data;
            console.log(this.locationList);
        });
    }
    initializeControls() {
        this.stockmovementrpt = {
            rowHeaders: true,
            viewportColumnRenderingOffset: 27,
            viewportRowRenderingOffset: 'auto',
            colWidths: 150,
            minRows: 10,
            width: '100%',
            height: 300,
            rowHeights: 23,
            fillHandle: {
                direction: 'vertical',
                autoInsertRow: true
            },
            data: [],
            minSpareRows: 1,
            // allowInsertColumn: false,
            allowInsertRow: true,
            // allowRemoveColumn: false,
            // allowRemoveRow: false,
            // autoWrapRow: false,
            // autoWrapCol: false,
            stretchH: "all",
            //  autoWrapRow: true,
            // height: 487,
            // maxRows: 22,
            manualRowResize: true,
            manualColumnResize: true,
            hiddenColumns: {
                columns: [8],
                indicators: false
            },
            // rowHeaders: true,
            columns: [
                {
                    data: 'account',
                    type: 'autocomplete',
                    source: (query, callback) => {
                        callback(this.acctArry);
                    },
                    allowInvalid: false,
                    strict: false
                },
                {
                    data: 'credit',
                    type: 'numeric'
                },
                {
                    data: 'jobname',
                    type: 'autocomplete',
                    source: (query, callback) => {
                        callback(this.jobArry);
                    },
                    allowInvalid: false,
                    strict: false
                },
                {
                    data: 'costcenter',
                    type: 'dropdown',
                    source: (query, callback) => {
                        callback(this.costcenterArry);
                    },
                },
                {
                    data: 'narration',
                    type: 'text',
                },
                {
                    data: 'id',
                    type: 'numeric'
                },
                {
                    data: 'Temp',
                    type: 'numeric'
                },
                {
                    data: 'Temp',
                    type: 'numeric'
                }
            ],
            colHeaders: [
                this.translate.instant('A'),
                this.translate.instant('B'),
                this.translate.instant('C'),
                this.translate.instant('D'),
                this.translate.instant('E'),
                this.translate.instant('F'),
                this.translate.instant('G'),
                this.translate.instant('H')
            ],
            manualRowMove: true,
            manualColumnMove: true,
            contextMenu: true,
            filters: true,
            dropdownMenu: true,
        };
        this.stockmovementrpt.beforeChangeRender = (change, source) => {
            this.ColumnSum();
        };
        this.stockmovementrpt.afterRemoveRow = (index, amount) => {
            // console.log('beforeRemove: index: %d, amount: %d', index, amount);
            // console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
            this.ColumnSum();
        };
        this.stockmovementrpt.afterValidate = (isValid, value, row, prop) => {
            if (!isValid) {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
            }
        };
    }
    ColumnSum() {
        if (this.stockmovementrpt.data.length > 0) {
            const sum1 = this.stockmovementrpt.data.filter(item => item.hasOwnProperty('credit'))
                .reduce((sum, current) => sum + current.credit, 0);
            this.stockMovementRptFormGroup.controls.ReceiptVoucherMasterDrAmount.setValue(sum1);
        }
    }
};
DamageEntryComponent = __decorate([
    Component({
        selector: 'app-damage-entry',
        templateUrl: './damage-entry.component.html',
        styleUrls: ['./damage-entry.component.scss']
    })
], DamageEntryComponent);
export { DamageEntryComponent };
//# sourceMappingURL=damage-entry.component.js.map
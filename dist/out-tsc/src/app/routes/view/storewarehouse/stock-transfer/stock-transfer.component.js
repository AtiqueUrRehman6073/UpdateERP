import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defaults } from 'src/app/shared/service/settings';
let StockTransferComponent = class StockTransferComponent {
    constructor(fb, router, activatedroute, translate, messageService, confirmation, masterApi, stockApi) {
        this.fb = fb;
        this.router = router;
        this.activatedroute = activatedroute;
        this.translate = translate;
        this.messageService = messageService;
        this.confirmation = confirmation;
        this.masterApi = masterApi;
        this.stockApi = stockApi;
        this.hotid = 'stockLedgerReport';
        this.licensekey = defaults.hotlicensekey;
        this.showCustomerList = false;
        this.btnFlag = { edit: true, cancel: true, save: true, new: false, delete: false, list: false };
        this.jobList = [
            { name: 'Job 1' },
            { name: 'Job 2' },
            { name: 'Job 3' },
            { name: 'Job 4' },
            { name: 'Job 5' },
            { name: 'Job 6' }
        ];
    }
    ngOnInit() {
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
            this.subtitle = data.title;
        });
        this.StockTransferGroup = new FormGroup({
            VoucherNo: new FormControl('', Validators.required),
            VoucherDate: new FormControl('', Validators.required),
            VoucherJob: new FormControl('', Validators.required),
            SelectedJob: new FormControl('', Validators.required),
            LocationFrom: new FormControl('', Validators.required),
            LocationTo: new FormControl('', Validators.required),
            CustomerName: new FormControl('', Validators.required),
            Department: new FormControl('', Validators.required)
        });
        this.selectedCustomer = "";
        this.customerDesc = true;
        this.cols = [
            { field: "customerTitle", header: "Title" },
            { field: "customerName", header: "Name" },
            { field: "customerEmail", header: "Email Address" },
            { field: "customerContact", header: "Contact No." }
        ];
        this.initializeControls();
    }
    selectCustomer(customerName) {
        this.selectedCustomer = customerName;
        this.showCustomerList = false;
        this.customerDesc = false;
    }
    initializeControls() {
        this.stockTransfer = {
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
                    data: 'Code',
                    type: 'numeric'
                },
                {
                    data: 'partNo',
                    type: 'text'
                },
                {
                    data: 'materialName',
                    type: 'text'
                },
                {
                    data: 'unit',
                    type: 'numeric'
                },
                {
                    data: 'quantity',
                    type: 'text',
                },
                {
                    data: 'costPrice',
                    type: 'numeric'
                },
                {
                    data: 'salesAmount',
                    type: 'numeric'
                }
            ],
            colHeaders: [
                this.translate.instant('Code'),
                this.translate.instant('Part No'),
                this.translate.instant('Material Name'),
                this.translate.instant('Unit'),
                this.translate.instant('Quantity'),
                this.translate.instant('Cost Price'),
                this.translate.instant('Sales Amount')
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
        this.stockTransfer.afterValidate = (isValid, value, row, prop) => {
            if (!isValid) {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
            }
        };
    }
    createNew() {
        this.getAllJobs();
        this.getAllLocations();
        this.getAllDepartments();
        this.btnFlag.cancel = false;
        this.btnFlag.edit = false;
        this.btnFlag.save = false;
    }
    getAllJobs() {
        this.masterApi.GetAllJob().subscribe(data => {
            this.jobList = data;
        });
    }
    getAllLocations() {
        this.masterApi.GetAllLocation().subscribe(data => {
            this.locationList = data;
        });
    }
    getAllDepartments() {
        this.stockApi.getAllDepartments().subscribe(data => {
            this.response = data;
            this.departmentList = this.response.Department_Master;
        });
    }
    showAllCustomers() {
        this.masterApi.GetAllCustomer().subscribe(data => {
            this.customerList = data;
        });
        this.showCustomerList = true;
    }
    get f() {
        return this.StockTransferGroup.controls;
    }
};
StockTransferComponent = __decorate([
    Component({
        selector: 'app-stock-transfer',
        templateUrl: './stock-transfer.component.html',
        styleUrls: ['./stock-transfer.component.scss']
    })
], StockTransferComponent);
export { StockTransferComponent };
//# sourceMappingURL=stock-transfer.component.js.map
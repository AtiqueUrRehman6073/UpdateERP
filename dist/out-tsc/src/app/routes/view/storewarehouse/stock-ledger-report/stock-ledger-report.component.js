import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotTableRegisterer } from '@handsontable/angular';
import { defaults } from 'src/app/shared/service/settings';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { GlobalSerivceService } from 'src/app/routes/service/stock-api/global-serivce.service';
let StockLedgerReportComponent = class StockLedgerReportComponent {
    constructor(fb, router, activatedroute, translate, messageService, confirmation, masterApi, stockApi) {
        this.fb = fb;
        this.router = router;
        this.activatedroute = activatedroute;
        this.translate = translate;
        this.messageService = messageService;
        this.confirmation = confirmation;
        this.masterApi = masterApi;
        this.stockApi = stockApi;
        this.itemIds = [];
        this.itemNames = [];
        this.units = [];
        this.openQty = [];
        this.openAmount = [];
        this.SinQty = [];
        this.SinAmount = [];
        this.SoutQty = [];
        this.SoutAmount = [];
        this.BalQty = [];
        this.BalAmount = [];
        this.btnlabel = 'Submit';
        this.wopts = { bookType: 'xlsx', type: 'array' };
        this.fileName = '';
        // onFileChange(evt: any) {
        //   this.exceltoJsonConverter(evt);
        //   // /* wire up file reader */
        //   // const target: DataTransfer = <DataTransfer>(evt.target);
        //   // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        //   // const reader: FileReader = new FileReader();
        //   // reader.onload = (e: any) => {
        //   //   /* read workbook */
        //   //   const bstr: string = e.target.result;
        //   //   const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        //   //   /* grab first sheet */
        //   //   const wsname: string = wb.SheetNames[0];
        //   //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        //   //   /* save data */
        //   //   this.data = <SheetData>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        //   //   console.log(this.data);
        //   //   //this.dataJson = JSON.stringify(this.data);
        //   //   //console.log(this.dataJson);
        //   // };
        //   // reader.readAsBinaryString(target.files[0]);
        // }
        this.hotid = 'stockLedgerReport';
        this.hotRegisterer = new HotTableRegisterer();
        this.exceltoJson = { sheet1: {} };
        this.exceltoarray = [];
        this.licensekey = defaults.hotlicensekey;
        this.gridHeader = "No Data";
        this.selectedItem = {
            Item_Master_Item_ID: "",
            Item_Master_Item_Name: ""
        };
        this.btnFlag = { edit: true, cancel: true, save: true, new: true, delete: true, list: false };
    }
    ngOnInit() {
        this.showLocationList = false;
        this.showJobList = false;
        this.showBrandList = false;
        this.moveToStockMovement = false;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
            this.subtitle = data.title;
        });
        this.initializeControls();
        this.ItemFormGroup = new FormGroup({
            ItemGroup: new FormControl('', Validators.required),
            ItemName: new FormControl('', Validators.required),
            DateFrom: new FormControl('', Validators.required),
            DateTo: new FormControl('', Validators.required),
            DateFormat: new FormControl('', Validators.required),
            Brand: new FormControl('', Validators.required),
            Location: new FormControl('', Validators.required),
            Job: new FormControl('', Validators.required),
            DetailsType: new FormControl('Details', Validators.required),
            DateType: new FormControl('Monthly', Validators.required)
        });
        this.cols = [
            { field: "Item_Master_Item_ID", header: "Item Code" },
            { field: "Item_Master_Item_Name", header: "Item Name" },
            { field: "Item_Master_Bar_Code", header: "Bar Code" },
            { field: "Item_Master_Part_No", header: "Part No." },
            { field: "Item_Master_Stock", header: "Stock" },
        ];
        this.jobCols = [
            { field: "Name", header: "Job Name" },
            { field: "JobNumber", header: "Job No." }
        ];
        this.brandCols = [
            { field: "Name", header: "Brand Name" }
        ];
        this.datedFrom = new Date(new Date().setFullYear(new Date().getFullYear() - 5));
        this.datedTo = new Date();
    }
    showItemGroups() {
        this.showItemGroupList = true;
        this.itemGroupList = [
            { itemId: '851', itemName: 'Diesel' },
            { itemId: '311', itemName: 'Garnet' },
            { itemId: '127', itemName: 'General' },
            { itemId: '472', itemName: 'Paints' }
        ];
    }
    showItems() {
        this.stockApi.getAllItemsList().subscribe(data => {
            this.tempResponse = data;
            this.itemList = this.tempResponse.Item_Master;
        });
        this.showItemList = true;
    }
    toggleActive(itemId) {
        this.itemGroupList.forEach(element => {
            $("#" + element.itemId).removeClass('selected');
        });
        $("#" + itemId).addClass('selected');
    }
    toggleActiveLoc(itemId, selectedItemName) {
        this.locationList.forEach(element => {
            $("#" + element.locationMasterLocationId).removeClass('selected');
        });
        $("#" + itemId).addClass('selected');
        this.selectedLocation = selectedItemName;
        this.showLocationList = false;
    }
    selectJob(jobName) {
        this.selectedJob = jobName;
        this.showJobList = false;
    }
    clearForm() {
        this.ItemFormGroup.controls['ItemGroup'].setValue('');
        this.ItemFormGroup.controls['ItemName'].setValue('');
        this.ItemFormGroup.controls['DateFrom'].setValue('');
        this.ItemFormGroup.controls['DateTo'].setValue('');
        this.ItemFormGroup.controls['DateFormat'].setValue('');
        this.ItemFormGroup.controls['Brand'].setValue('');
        this.ItemFormGroup.controls['Location'].setValue('');
        this.ItemFormGroup.controls['Job'].setValue('');
        this.ItemFormGroup.controls['DetailsType'].setValue('');
        this.ItemFormGroup.controls['DateType'].setValue('');
    }
    getStockLedgerRpt() {
        this.btnFlag = { edit: false, cancel: false, save: false, new: false, delete: false, list: false };
        this.stockApi.getStockLedgerReport().subscribe(data => {
            this.response = data;
            this.dataset = this.response;
            this.gridHeader = "Showing All Data";
        }, (error) => {
            console.log(error);
        });
    }
    getFilteredStockLedgerRpt() {
        this.btnFlag = { edit: false, cancel: false, save: false, new: false, delete: false, list: false };
        this.payload = {
            itemGroup: new String(this.ItemFormGroup.value.ItemGroup),
            itemName: this.ItemFormGroup.value.ItemName,
            dateFrom: this.ItemFormGroup.value.DateFrom,
            dateTo: this.ItemFormGroup.value.DateTo,
            brand: this.ItemFormGroup.value.Brand,
            location: this.ItemFormGroup.value.Location,
            job: this.ItemFormGroup.value.Job,
            detailsType: this.ItemFormGroup.value.DetailsType,
            dateType: this.ItemFormGroup.value.DateType,
        };
        this.stockApi.getFilteredStockLedgerRpt(this.payload).subscribe(data => {
            this.response = data;
            this.dataset = this.response.Stock_Register;
            this.gridHeader = "Showing Filtered Data";
        }, (error) => {
            console.log(error);
        });
    }
    onCancel() {
        this.dataset = [];
        this.btnFlag = { edit: true, cancel: true, save: true, new: true, delete: true, list: false };
    }
    saveStockLedgerReport() {
        this.displayMaximizable = true;
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to save Receipt?',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Stock Ledger Report Saved Succesfully' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Stock Ledger Report Save Cancelled' });
            }
        });
    }
    getAllLocations() {
        this.masterApi.GetAllLocation().subscribe(data => {
            this.locationList = data;
            this.showLocationList = true;
        });
    }
    getAllJobs() {
        this.masterApi.GetAllJob().subscribe(data => {
            this.jobList = data;
            this.showJobList = true;
        });
    }
    getAllBrands() {
        this.masterApi.GetAllBrand().subscribe(data => {
            this.brandList = data;
            console.log(this.brandList);
            this.showBrandList = true;
        });
    }
    getDetailsByItem(item_Id) {
        this.btnFlag = { edit: false, cancel: false, save: false, new: false, delete: false, list: false };
        this.payload = {
            itemGroup: new String(item_Id),
            itemName: this.ItemFormGroup.value.ItemName,
            dateFrom: this.ItemFormGroup.value.DateFrom,
            dateTo: this.ItemFormGroup.value.DateTo,
            brand: this.ItemFormGroup.value.Brand,
            location: this.ItemFormGroup.value.Location,
            job: this.ItemFormGroup.value.Job,
            detailsType: this.ItemFormGroup.value.DetailsType,
            dateType: this.ItemFormGroup.value.DateType,
        };
        this.stockApi.getDetailsByItem(this.payload).subscribe(data => {
            this.showItemList = false;
            this.response = data;
            this.dataset = this.response.Stock_Register;
            GlobalSerivceService.getDetailsByItemFromStockLedger = this.response.Stock_Register;
            this.router.navigateByUrl('/storewarehouse/stockmovementreport');
        }, (error) => {
            console.log(error);
        });
    }
    selectItem(item) {
        console.log(item);
        this.selectedItem = item;
        this.ItemFormGroup.value.itemGroup = item.Item_Master_Item_ID;
        this.ItemFormGroup.value.itemName = item.Item_Master_Item_Name;
        this.showItemList = false;
    }
    initializeControls() {
        this.stockLedgerReport = {
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
            afterOnCellMouseDown: (event, coords, TD) => {
                console.log(TD.innerText);
                if (this.moveToStockMovement) {
                    this.getDetailsByItem(TD.innerText);
                }
                this.moveToStockMovement = true;
                setTimeout(() => {
                    this.moveToStockMovement = false;
                }, 1000);
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
                    data: 'itemId',
                    type: 'numeric'
                },
                {
                    data: 'itemName',
                    type: 'text'
                },
                {
                    data: 'unit',
                    type: 'text'
                },
                {
                    data: 'SinOpenQty',
                    type: 'numeric'
                },
                {
                    data: 'SinOpenAmount',
                    type: 'text',
                },
                {
                    data: 'SoutOpenQty',
                    type: 'numeric'
                },
                {
                    data: 'SoutOpenAmount',
                    type: 'numeric'
                },
                {
                    data: 'BalQty',
                    type: 'numeric'
                },
                {
                    data: 'BalAmount',
                    type: 'numeric'
                }
            ],
            colHeaders: [
                this.translate.instant('Item Id'),
                this.translate.instant('Item Name'),
                this.translate.instant('Unit'),
                this.translate.instant('Open Qty'),
                this.translate.instant('Open Amount'),
                this.translate.instant('Stock In Qty'),
                this.translate.instant('Stock In Amount'),
                this.translate.instant('Stock Out Qty'),
                this.translate.instant('Stock Out Amount'),
                this.translate.instant('Balance Qty'),
                this.translate.instant('Balance Amount'),
            ],
            manualRowMove: true,
            manualColumnMove: true,
            contextMenu: true,
            filters: true,
            dropdownMenu: true,
        };
        this.stockLedgerReport.beforeChangeRender = (change, source) => {
            this.ColumnSum();
        };
        this.stockLedgerReport.afterRemoveRow = (index, amount) => {
            // console.log('beforeRemove: index: %d, amount: %d', index, amount);
            // console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
            this.ColumnSum();
        };
        this.stockLedgerReport.afterValidate = (isValid, value, row, prop) => {
            if (!isValid) {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
            }
        };
    }
    ColumnSum() {
        if (this.stockLedgerReport.data.length > 0) {
            const sum1 = this.stockLedgerReport.data.filter(item => item.hasOwnProperty('credit'))
                .reduce((sum, current) => sum + current.credit, 0);
            this.stockLedgerFormGroup.controls.ReceiptVoucherMasterDrAmount.setValue(sum1);
        }
    }
    export() {
        var i = 0, result = [];
        while (i < Object.keys(this.exceltoJson.sheet1).length) {
            result.push([]);
            for (var key in this.exceltoJson.sheet1[i].fields) {
                result[result.length - 1].push(this.exceltoJson.sheet1[i].fields[key]);
            }
            i++;
        }
        this.data = result;
        /* generate worksheet */
        const ws = XLSX.utils.aoa_to_sheet(this.data);
        /* generate workbook and add the worksheet */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }
    // exceltoJsonConverter(event: any) {
    //   this.exceltoJson = { sheet1: {} };
    //   let headerJson = {};
    //   /* wire up file reader */
    //   const target: DataTransfer = <DataTransfer>(event.target);
    //   // if (target.files.length !== 1) {
    //   //   throw new Error('Cannot use multiple files');
    //   // }
    //   const reader: FileReader = new FileReader();
    //   reader.readAsBinaryString(target.files[0]);
    //   console.log("filename", target.files[0].name);
    //   this.exceltoJson['filename'] = target.files[0].name;
    //   reader.onload = (e: any) => {
    //     /* create workbook */
    //     const binarystr: string = e.target.result;
    //     const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
    //     for (var i = 0; i < wb.SheetNames.length; ++i) {
    //       const wsname: string = wb.SheetNames[i];
    //       const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //       const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    //       this.exceltoJson[`sheet${i + 1}`] = data;
    //       this.exceltoarray.push[`sheet${i + 1}`] = data.toString();
    //       const headers = this.get_header_row(ws);
    //       headerJson[`header${i + 1}`] = headers;
    //       this.cols.push(headers);
    //       //  console.log("json",headers);
    //     }
    //     this.exceltoJson['headers'] = headerJson;
    //     console.log(this.cols);
    //   };
    // }
    // get_header_row(sheet) {
    //   var headers = [];
    //   var range = XLSX.utils.decode_range(sheet['!ref']);
    //   var C, R = range.s.r; /* start in the first row */
    //   /* walk every column in the range */
    //   for (C = range.s.c; C <= range.e.c; ++C) {
    //     var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
    //     // console.log("cell",cell)
    //     var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
    //     if (cell && cell.t) {
    //       hdr = XLSX.utils.format_cell(cell);
    //       headers.push(hdr);
    //     }
    //   }
    //   return headers;
    // }
    // new() {
    //   this.stockLedgerFormGroup.reset();
    //   this.stockLedgerReport.data = [];
    //   this.stockLedgerReport.readOnly = false;
    //   this.hotRegisterer.getInstance(this.hotid).updateSettings(this.stockLedgerReport);
    // }
    get f() {
        return this.ItemFormGroup.controls;
    }
};
StockLedgerReportComponent = __decorate([
    Component({
        selector: 'app-stock-ledger-report',
        templateUrl: './stock-ledger-report.component.html',
        styleUrls: ['./stock-ledger-report.component.scss']
    })
], StockLedgerReportComponent);
export { StockLedgerReportComponent };
//# sourceMappingURL=stock-ledger-report.component.js.map
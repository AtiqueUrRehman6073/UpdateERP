import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotTableRegisterer } from '@handsontable/angular';
import { defaults } from 'src/app/shared/service/settings';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountApiService } from 'src/app/routes/service/account.api.service';
import { StockApiService } from 'src/app/routes/service/stock-api/stock-api.service';
import { interval } from 'rxjs';
import * as $ from 'jquery';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { GlobalSerivceService } from 'src/app/routes/service/stock-api/global-serivce.service';

type SheetData = any[][];

@Component({
  selector: 'app-stock-ledger-report',
  templateUrl: './stock-ledger-report.component.html',
  styleUrls: ['./stock-ledger-report.component.scss']
})
export class StockLedgerReportComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private translate: TranslateService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private masterApi: MasterApiService,
    private stockApi: StockApiService
  ) {
    this.licensekey = defaults.hotlicensekey;
  }
  response: any;
  btnFlag: {
    edit: boolean,
    cancel: boolean,
    save: boolean,
    new: boolean,
    delete: boolean,
    list: boolean
  };
  itemIds = [];
  itemNames = [];
  units = [];
  openQty = [];
  openAmount = [];
  SinQty = [];
  SinAmount = [];
  SoutQty = [];
  SoutAmount = [];
  BalQty = [];
  BalAmount = [];
  locationList: any;
  jobList: any;
  brandList: any;
  title: string;
  dataset: any;
  payload: any;
  subtitle: string;
  gridHeader: string;
  displayMaximizable: boolean;
  itemGroupList: any;
  showItemGroupList: boolean;
  showItemList: boolean;
  showLocationList: boolean;
  showJobList: boolean;
  showBrandList: boolean;
  itemList: any;
  selectedItem: item;
  breadcumbmodel: MenuItem[];
  btnlabel: string = 'Submit';
  data: SheetData;
  fileName: string = '';
  ItemFormGroup: FormGroup;
  licensekey: string;
  cols: Array<any>;
  jobCols: Array<any>;
  brandCols: Array<any>;
  datedFrom: any;
  datedTo: any;
  selectedLocation: any;
  selectedJob: any;
  moveToStockMovement: boolean;
  hotid = 'stockLedgerReport';
  private hotRegisterer = new HotTableRegisterer();
  stockLedgerReport: Handsontable.GridSettings;
  stockLedgerFormGroup: FormGroup;

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;          //////  Setting Title of the page
      this.subtitle = data.title;       //////  Setting Sub-Title of the page
    });
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));           //////  Setting BreadCrumb of the page
    this.gridHeader = "No Data";
    this.selectedItem = {
      Item_Master_Item_ID: "",
      Item_Master_Item_Name: ""
    }
    this.btnFlag = { edit: true, cancel: true, save: true, new: true, delete: true, list: false };          //////  Setting Button Flags of the page
    this.showLocationList = false;
    this.showJobList = false;
    this.showBrandList = false;
    this.moveToStockMovement = false;
    this.initializeControls();
    this.ItemFormGroup = new FormGroup({                    //////   Item Form Group
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
    this.cols = [                                           //////   Setting Table Cols and Titles
      { field: "item_Master_Item_ID", header: "Item Code" },
      { field: "item_Master_Item_Name", header: "Item Name" },
      { field: "item_Master_Bar_Code", header: "Bar Code" },
      { field: "item_Master_Part_No", header: "Part No." },
      { field: "item_Master_Stock", header: "Stock" },
    ];
    this.jobCols = [
      { field: "Name", header: "Job Name" },
      { field: "JobNumber", header: "Job No." }
    ];
    this.brandCols = [
      { field: "Name", header: "Brand Name" }
    ];
    this.datedFrom = new Date(new Date().setFullYear(new Date().getFullYear() - 5));        /////   Setting Defaults for Date
    this.datedTo = new Date();
  }
  showItemGroups() {
    this.showItemGroupList = true;
    this.itemGroupList = [
      { itemId: '851', itemName: 'Diesel', checked: true },
      { itemId: '311', itemName: 'Garnet', checked: true },
      { itemId: '127', itemName: 'General', checked: false },
      { itemId: '472', itemName: 'Paints', checked: true }
    ];
  }
  showItems() {
    this.stockApi.getAllItemsList().subscribe(
      data => {
        this.itemList = data;
        console.log(this.itemList);
      }
    );
    this.showItemList = true;
  }
  toggleActive(itemId) {
    this.itemGroupList.forEach(element => {
      if (element.itemId === itemId)
        element.checked = !element.checked;
    });
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
  //done
  getStockLedgerRpt() {
    this.btnFlag = { edit: false, cancel: false, save: false, new: false, delete: false, list: false };
    this.stockApi.getStockLedgerReport().subscribe(
      data => {
        this.response = data;
        this.dataset = this.response;
        this.gridHeader = "Showing All Data";
      }, (error) => {
        console.log(error);
      });
  }
  //done
  getFilteredStockLedgerRpt() {
    if (this.f.ItemGroup.invalid || this.f.ItemName.invalid || this.f.DateFrom.invalid || this.f.DateTo.invalid || this.f.Brand.invalid
      || this.f.Location.invalid || this.f.DetailsType.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Please fill all the required feilds.!' });
      return;
    }
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
    this.stockApi.getFilteredStockLedgerRpt(this.payload).subscribe(
      data => {
        this.response = data;
        this.dataset = this.response.Stock_Register;
        this.gridHeader = "Showing Filtered Data";
      }, (error) => {
        console.log(error);
      });
  }
  getAllLocations() {
    this.masterApi.GetAllLocation().subscribe(
      data => {
        this.locationList = data;
      });
    this.showLocationList = true;
  }
  getAllJobs() {
    this.masterApi.GetAllJob().subscribe(
      data => {
        this.jobList = data;
      });
    this.showJobList = true;
  }
  // Not clear
  getAllBrands() {
    this.masterApi.GetAllBrand().subscribe(
      data => {
        this.brandList = data;
        console.log(this.brandList);
      });
    this.showBrandList = true;
  }
  getDetailsByItem(item_Id: any) {
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
    this.stockApi.getDetailsByItem(this.payload).subscribe(
      data => {
        this.showItemList = false;
        this.response = data;
        this.dataset = this.response.Stock_Register;
        GlobalSerivceService.getDetailsByItemFromStockLedger = this.response.Stock_Register;
        this.router.navigateByUrl('/storewarehouse/stockmovementreport');
      }, (error) => {
        console.log(error);
      });
  }
  selectItem(item: any) {
    console.log(item);
    this.selectedItem = item;
    this.ItemFormGroup.value.itemGroup = item.Item_Master_Item_ID;
    this.ItemFormGroup.value.itemName = item.Item_Master_Item_Name;
    this.showItemList = false;
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
        this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Report Not Saved!' });
      }
    });
  }
  initializeControls() {
    this.stockLedgerReport = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 100,
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
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
      hiddenColumns: {
        columns: [5],
        indicators: false
      },
      columns: [
        {
          data: 'itemId',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          },
          allowInvalid: false,
          strict: false
        },
        {
          data: 'ItemName',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'unit',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'OpenQty',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'OpenAmount',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'SinQty',            /////// Not showing on UI
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'SinAmount',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'SoutQty',
          type: 'autocomplete',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'SoutAmount',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'BalQty',
          source: (query, callback) => {
            callback(this.dataset);
          }
        },
        {
          data: 'BalAmount',
          source: (query, callback) => {
            callback(this.dataset);
          }
        }
      ],
      colHeaders: [
        this.translate.instant('Item Id'),
        this.translate.instant('Item Name'),
        this.translate.instant('Unit'),
        this.translate.instant('Open Qty'),
        this.translate.instant('Open Amount'),
        this.translate.instant('Sin Quantity'),  /////   Not showing on UI
        this.translate.instant('Sin Amount'),
        this.translate.instant('Sout Quantity'),
        this.translate.instant('Sout Amount'),
        this.translate.instant('Balance Quantity'),
        this.translate.instant('Balance Amount'),
      ],
    };

    // this.stockLedgerReport.beforeChangeRender = (change, source) => {
    //   this.ColumnSum();
    // };
    // this.stockLedgerReport.afterRemoveRow = (index: number, amount: number) => {
    //   console.log('beforeRemove: index: %d, amount: %d', index, amount);
    //   console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
    //   this.ColumnSum();

    // };


    // this.stockLedgerReport.afterValidate = (isValid, value, row, prop) => {
    //   if (!isValid) {
    //     this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
    //   }

    // };



  }
  ColumnSum() {
    // if (this.stockLedgerReport.data.length > 0) {
    //   const sum1 = this.stockLedgerReport.data.filter(item => item.hasOwnProperty('credit'))
    //     .reduce((sum, current) => sum + current.credit, 0);
    //   this.stockLedgerFormGroup.controls.ReceiptVoucherMasterDrAmount.setValue(sum1);
    // }
  }
  get f() {
    return this.ItemFormGroup.controls;
  }
}
interface item {
  Item_Master_Item_ID: string,
  Item_Master_Item_Name: string
}

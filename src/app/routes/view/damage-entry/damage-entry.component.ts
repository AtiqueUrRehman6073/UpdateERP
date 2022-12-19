import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { MenuItem } from 'primeng/api/menuitem';
import Handsontable from 'handsontable';
import { defaults } from 'src/app/shared/service/settings';
import { TranslateService } from '@ngx-translate/core';
import { AccountApiService } from 'src/app/routes/service/account.api.service';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { ChartofAccounts, ReceiptVoucher, ReceiptVoucherDetails } from 'src/app/routes/domain';
import { JobMaster } from 'src/app/routes/domain/JobMaster';
import { CostCenterMaster } from 'src/app/routes/domain/CostCenterMaster';
import { AccountsTransactions } from 'src/app/routes/domain/AccountsTransactions';
import { HotTableRegisterer } from '@handsontable/angular';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { DropDownValidator } from 'src/app/shared/validator/customvalidtor';
import { StockApiService } from 'src/app/routes/service/stock-api/stock-api.service';

@Component({
  selector: 'app-damage-entry',
  templateUrl: './damage-entry.component.html',
  styleUrls: ['./damage-entry.component.scss']
})
export class DamageEntryComponent implements OnInit {

  dataset: [];
  list: any;
  confirmDropDatabaseDialogVisible = false;
  title: string;
  search: string;
  index: number = 0;
  displayMaximizable: boolean;
  breadcumbmodel: MenuItem[];
  licensekey: string;
  locationList: Array<any>;
  btnFlag: ButtonFlag;
  private hotRegisterer = new HotTableRegisterer();
  hotid = 'receiptVouchrEntry';
  constructor(private activatedroute: ActivatedRoute,
    private service: StockApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private translate: TranslateService,
    private router: Router,
    private masterapi: MasterApiService,
    private accountapi: AccountApiService) {
    this.licensekey = defaults.hotlicensekey;
  }

  stockmovementrpt: Handsontable.GridSettings;
  damageEntryFormGroup: FormGroup;
  cols: any;
  ngOnInit(): void {
    this.cols = [
      { field: 'Item_Master_Item_ID', header: 'Item Id' },
      { field: 'Item_Master_Item_Name', header: 'Item Name' },
      { field: 'Item_Master_Part_No', header: 'Unit' },
      { field: 'Item_Master_Part_No', header: 'Part No' },
      { field: 'Item_Master_Part_No', header: 'Price' },
      { field: 'Item_Master_Part_No', header: 'Amount' },
      { field: 'Item_Master_Barcode', header: 'Item Barcode' },
      { field: 'Remarks', header: 'Remarks' },
      { field: 'Action', header: 'Actions' }
    ];
    this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
    this.initializeControls();
    /// this.getAllLocations();
    this.locationList = [{ locationMasterLocationName: "Area Store" }, { locationMasterLocationName: "Sub Store" }];
    this.damageEntryFormGroup = new FormGroup({
      voucherNo: new FormControl('0', Validators.required),
      voucherDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      location: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
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
    },
      error => {
        console.error("Data Not found...!");
      });
  }
  GetItemDetails(id) {
    this.displayMaximizable = false;
    this.service.getStockMovementDetailsRpt({ ItemMasterItemId: id }).subscribe(respose => {
      this.list = respose;
      this.dataset = this.list.ItemDetails;
      console.error(this.dataset);
    },
      error => {
        console.error("Data Not found...!");
      });
  }
  handleChange(e) {
    this.index = e.index;
  }
  get f() {
    return this.damageEntryFormGroup.controls;
  }
  getAllLocations() {
    this.masterapi.GetAllLocation().subscribe(
      data => {
        this.locationList = data;
      }
    );
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
          data: 'itemId',
          type: 'text',
        },
        {
          data: 'itemName',
          type: 'text',
        },
        {
          data: 'unit',
          type: 'text',
        },
        {
          data: 'partNo',
          type: 'text',
        },
        {
          data: 'price',
          type: 'text',
        },
        {
          data: 'amount',
          type: 'text',
        },
        {
          data: 'itemBarcode',
          type: 'text',
        },
        {
          data: 'remarks',
          type: 'text',
        }
      ],
      colHeaders: [
        this.translate.instant('Item Id'),
        this.translate.instant('Item Name'),
        this.translate.instant('Unit'),
        this.translate.instant('Part No'),
        this.translate.instant('Price'),
        this.translate.instant('Amount'),
        this.translate.instant('Barcode'),
        this.translate.instant('Remarks')
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
    this.stockmovementrpt.afterRemoveRow = (index: number, amount: number) => {
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
      this.damageEntryFormGroup.controls.ReceiptVoucherMasterDrAmount.setValue(sum1);
    }
  }

  //////    12-19-22  //////

  displayListing: boolean = false;
  diplayDamageEntryListing() {
    this.displayListing = true;
  }
  datasetDE: any = [
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Flower', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Paint', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Toy Car', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Petrolium', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Diesel', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Cartoon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Football', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Snacks', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { Item_Master_Item_ID: 4, Item_Master_Item_Name: 'Balloon', Item_Master_Part_No: 'Cs6', Item_Master_Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false }
  ];
  editable: boolean = false;
  toggleEditable(x: string) {
    this.datasetDE.forEach(element => {
      if (element.Item_Master_Item_Name === x)
        element.editable = !element.editable;
    });
  }
  updateItem(){
    this.messageService.add({ severity: 'succes', summary: 'Alert', detail: 'Data Updated Successfully' });
  }
}
interface ButtonFlag {
  edit?: boolean; cancel?: boolean; update?: boolean;
  save?: boolean; delete?: boolean;
}

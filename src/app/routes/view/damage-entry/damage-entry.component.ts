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
import { element } from 'protractor';

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
  hotid = 'damageEntry';                                            //////////  Updated
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
      { field: 'ItemId', header: 'Item Id' },
      { field: 'ItemName', header: 'Item Name' },
      { field: 'Unit', header: 'Unit' },
      { field: 'PartNo', header: 'Part No' },
      { field: 'Price', header: 'Price' },
      { field: 'PartNo', header: 'Amount' },
      { field: 'Barcode', header: 'Item Barcode' },
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
          data: 'ItemId',
          type: 'text',
        },
        {
          data: 'ItemName',
          type: 'text',
        },
        {
          data: 'Unit',
          type: 'text',
        },
        {
          data: 'PartNo',
          type: 'text',
        },
        {
          data: 'Price',
          type: 'text',
        },
        {
          data: 'Amount',
          type: 'text',
        },
        {
          data: 'Barcode',
          type: 'text',
        },
        {
          data: 'Remarks',
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
    { ItemId: 4, ItemName: 'Flower', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Paint', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Toy Car', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Petrolium', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Diesel', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Cartoon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Football', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Snacks', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false },
    { ItemId: 4, ItemName: 'Balloon', Unit: '004', Price: '$1000', Amount: '1400', PartNo: 'Cs6', Barcode: '2164616314', Remarks: 'No Remark Yet', editable: false }
  ];
  editable: boolean = false;
  beingEdited: DamageEntryItem;
  toggleEditable(x: string, event: string) {
    if (!this.editable || event.trim() === 'cancel') {
      this.datasetDE.forEach(element => {
        if (element.ItemName === x) {
          element.editable = !element.editable;
          this.editable = !this.editable;
          if (element.editable) {
            this.beingEdited = element;
          }
          else {
            this.beingEdited = null;
          }
        }
      });
    }
    else this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'You can edit one item at a time ' });
  }
  updateValue(key: any, id: string, value: any) {
    this.datasetDE.forEach(element => {
      if (element.ItemId === key) {
        if (id.trim() === 'name')
          this.beingEdited.ItemName = value;
        else if (id.trim() === 'unit')
          this.beingEdited.Unit = value;
        else if (id.trim() === 'partno')
          this.beingEdited.PartNo = value;
        else if (id.trim() === 'price')
          this.beingEdited.Price = value;
        else if (id.trim() === 'amount')
          this.beingEdited.Amount = value;
        else if (id.trim() === 'barcode')
          this.beingEdited.Barcode = value;
        else if (id.trim() === 'remarks')
          this.beingEdited.Remarks = value;
      }
    });
    console.log(this.beingEdited);
  }
  gridData:GridData[] = new Array<DamageEntryItem>();
  tempIterator:number = 0;
  updateItem() {
    if (this.beingEdited.ItemName === null || this.beingEdited.ItemName.length === 0 || this.beingEdited.Unit === null || this.beingEdited.Unit.length === 0 || this.beingEdited.Price === null || this.beingEdited.Price.length === 0 || this.beingEdited.Amount === null || this.beingEdited.Amount.length === 0 ||
      this.beingEdited.PartNo === null || this.beingEdited.PartNo.length === 0 || this.beingEdited.Barcode === null || 
      this.beingEdited.Barcode.length === 0 || this.beingEdited.Remarks === null || this.beingEdited.Remarks.length === 0 ){
        this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Null Data Not Allowed' });
        return;
      }
    console.log(this.beingEdited);
    this.gridData[this.tempIterator] = this.beingEdited;
    this.tempIterator++;
    console.log(this.gridData);
    this.hotRegisterer.getInstance(this.hotid).updateSettings({ data: this.gridData, readOnly: true });
    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Data Updated Successfully' });
  }
  ////// Update the data on grid is done in the above function
  ////// Referred from : Check the Update Form Grid function in receipt Voucher to Study the handsontable update grid data settings 
}
interface GridData{
  ItemName?:string,
  Remarks?:string,
}
interface DamageEntryItem{
  ItemId:string,
  ItemName:string,
  Unit:string,
  PartNo?:string,
  Price:string,
  Amount:string,
  Barcode:string,
  Remarks:string,
}
interface ButtonFlag {
  edit?: boolean; cancel?: boolean; update?: boolean;
  save?: boolean; delete?: boolean;
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { ConfirmationService, MenuItem, MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { StockApiService } from 'src/app/routes/service/stock-api/stock-api.service';
import { defaults } from 'src/app/shared/service/settings';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.scss']
})
export class StockTransferComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private translate: TranslateService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private masterApi: MasterApiService,
    private stockApi: StockApiService, ) {
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

  btnFlag: {
    edit: boolean,
    cancel: boolean,
    save: boolean,
    new: boolean,
    delete: boolean,
    list: boolean
  };
  breadcumbmodel: MenuItem[];
  jobList: Array<any>;
  locationList: Array<any>;
  departmentList: any;
  customerList: Array<any>;
  dataset: any;
  selectedJob: string;
  showCustomerList: boolean;
  cols: any;
  licensekey: string;
  response: any;
  subtitle: string;
  StockTransferGroup: FormGroup;
  stockTransfer: Handsontable.GridSettings;
  title: string;
  selectedCustomer: string;
  customerDesc: boolean;

  ngOnInit(): void {
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
      Department: new FormControl('', Validators.required),
      Narration: new FormControl('', Validators.required)
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
    this.customerDesc = false
  }
  hotid = 'stockLedgerReport';
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
    this.masterApi.GetAllJob().subscribe(
      data => {
        this.jobList = data;
      }
    )
  }
  getAllLocations() {
    this.masterApi.GetAllLocation().subscribe(
      data => {
        this.locationList = data;
      }
    );
  }
  getAllDepartments() {
    this.stockApi.getAllDepartments().subscribe(
      data => {
        this.response = data;
        this.departmentList = this.response.Department_Master;
      }
    );
  }
  showAllCustomers() {
    this.masterApi.GetAllCustomer().subscribe(
      data => {
        this.customerList = data;
      }
    );
    this.showCustomerList = true;
  }
  get f() {
    return this.StockTransferGroup.controls;
  }
}

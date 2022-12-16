import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { defaults } from 'src/app/shared/service/settings';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StockApiService } from 'src/app/routes/service/stock-api/stock-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-customer-enquiry-search',
  templateUrl: './customer-enquiry-search.component.html',
  styleUrls: ['./customer-enquiry-search.component.scss']
})
export class CustomerEnquirySearchComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private masterApi: MasterApiService,
    private stockApi: StockApiService
  ) {
    this.licensekey = defaults.hotlicensekey;
  }

  title: string = '';
  index: number = 0;
  report: any = [];
  customerNameList: Array<string> = ['---Select Customer Name---'];
  hotid = 'stockLedgerReport';
  licensekey: string;
  customerEnquirySearch: any;
  dataset: any = [];
  useDateRange: boolean;
  customerEnquiryFormGroup: FormGroup;
  btnFlag: {
    list?: boolean,
    save?: boolean,
    cancel?: boolean
  }
  ngOnInit(): void {
    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Please fill all the required feilds.!' });
    this.useDateRange = true;
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
    });
    this.btnFlag = { cancel: true, save: true, list: false };
    this.initializeControls();
    this.customerEnquiryFormGroup = new FormGroup({
      enquiryNo: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
    });
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


    // this.customerEnquirySearch.afterValidate = (isValid, value, row, prop) => {
    //   if (!isValid) {
    //     this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
    //   }
    //};
  }
  getcustomerEnquiryReport() {
    this.stockApi.customerEnquiryReport().subscribe(
      data => {
        console.log(data);
        this.report = data;
        this.dataset = this.report.Enquiry_Master;
      }
    );
  }
  getFilteredcustomerEnquiryReport() {
    if ((this.f.enquiryNo.invalid || this.f.customerName.invalid) || (this.useDateRange && (this.f.dateFrom.invalid || this.f.dateTo.invalid))) {
      this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Please fill all the required feilds.!' });
      console.log('callled');
      return;
    }
    else
      this.stockApi.customerEnquiryReport().subscribe(
        data => {
          console.log(data);
          this.report = data;
          this.dataset = this.report.Enquiry_Master;
        }
      );
  }
  toggleDateRange() {
    if (this.useDateRange) {
      this.customerEnquiryFormGroup.controls["dateFrom"].enable();
      this.customerEnquiryFormGroup.controls["dateTo"].enable();
    }
    else {
      this.customerEnquiryFormGroup.controls["dateTo"].disable();
      this.customerEnquiryFormGroup.controls["dateFrom"].disable();
    }
  }
  get f() {
    return this.customerEnquiryFormGroup.controls;
  }

}
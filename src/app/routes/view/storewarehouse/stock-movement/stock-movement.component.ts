import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { ChartofAccounts, CurrencyMaster, ReceiptVoucher, ReceiptVoucherDetails } from 'src/app/routes/domain';
import { MenuItem } from 'primeng/api/menuitem';
import { map } from 'rxjs/operators';
import { AccountsTransactions } from 'src/app/routes/domain/AccountsTransactions';
import { DropDownValidator } from 'src/app/shared/validator/customvalidtor';
import Handsontable from 'handsontable';
import { defaults } from 'src/app/shared/service/settings';
import { AccountApiService } from 'src/app/routes/service/account.api.service';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem, MessageService, ConfirmationService } from 'primeng';
import { CostCenterMaster } from 'src/app/routes/domain/CostCenterMaster';
import { JobMaster } from 'src/app/routes/domain/JobMaster';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.scss']
})
export class StockMovementComponent implements OnInit {
  confirmDropDatabaseDialogVisible = false;
  title: string;
  search: string;
  index: number = 0;
  displayMaximizable: boolean;
  breadcumbmodel: MenuItem[];
  licensekey: string;
  locations: any = [];
  stockMovement: Handsontable.GridSettings;
  stockMovementFormGroup: FormGroup;
  stockMovementDetailFormGroup: FormGroup;
  cols: any;
  btnFlag: ButtonFlag;
  private hotRegisterer = new HotTableRegisterer();
  hotid = 'stock-movement';

  constructor(private activatedroute: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private translate: TranslateService,
    private router: Router,
    private masterapi: MasterApiService,
    private accountapi: AccountApiService) {
    this.licensekey = defaults.hotlicensekey;
    this.locations = [
      { name: 'Main::1' },
      { name: 'Main::2' },
      { name: 'Main::3' }
    ];
  }
  ngOnInit(): void {
    this.cols = [
      // { field: 'ReceiptVoucherMasterVoucherNo', header: 'Voucher No' },
      // { field: 'ReceiptVoucherMasterVoucherDate', header: 'Date' },
      // { field: 'ReceiptVoucherMasterDrAcNo', header: 'Account' },
      // { field: 'ReceiptVoucherMasterCurrencyId', header: 'Currency' },
      // { field: 'ReceiptVoucherMasterDrAmount', header: 'Vchr.Debit' },
      // { field: 'ReceiptVoucherMasterCrAmount', header: 'Vchr.Credit' },
      // { field: 'ReceiptVoucherMasterNarration', header: 'Particulars' },
      // { field: 'ReceiptVoucherMasterDrAmount', header: 'Dtls.Debit' },
      // { field: 'ReceiptVoucherMasterCrAmount', header: 'Dtls.Credit' }
    ];

    this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
    this.initializeControls();
    this.stockMovementFormGroup = new FormGroup({

      itemCode: new FormControl('',Validators.required),
      itemCodeB: new FormControl('',Validators.required),
      date: new FormControl(null,Validators.required),
      dateFrom: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() - 5)),Validators.required),
      dateTo: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())),Validators.required),
      itemName: new FormControl('', Validators.required),
      location: new FormControl(-1, [DropDownValidator]),
      quantity: new FormControl('0.000',[Validators.required]),
    });
    this.stockMovementDetailFormGroup = new FormGroup({
      openQty: new FormControl('0'),
      openAmount: new FormControl('0.000'),
      closeQty: new FormControl('0'),
      closeAmount: new FormControl('0.000'),
    });
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
    });
  }
  get f() {
    return this.stockMovementFormGroup.controls;
  }

  initializeControls() {
    // this.getAllAccountTransaction();
    this.stockMovement = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: 150,
      minRows: 2,
      width: '100%',
      height: 150,
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
            callback(this.locations);
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
            callback(this.locations);
          },
          allowInvalid: false,
          strict: false
        },
        {
          data: 'costcenter',
          type: 'dropdown',
          source: (query, callback) => {
            callback(this.locations);
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

    this.stockMovement.beforeChangeRender = (change, source) => {
      this.ColumnSum();

    };
    this.stockMovement.afterRemoveRow = (index: number, amount: number) => {
      // console.log('beforeRemove: index: %d, amount: %d', index, amount);
      // console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
      this.ColumnSum();

    };


    this.stockMovement.afterValidate = (isValid, value, row, prop) => {
      if (!isValid) {
        this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
      }

    };



  }
  ColumnSum() {
    if (this.stockMovement.data.length > 0) {
      const sum1 = this.stockMovement.data.filter(item => item.hasOwnProperty('credit'))
        .reduce((sum, current) => sum + current.credit, 0);
      this.stockMovementFormGroup.controls.ReceiptVoucherMasterDrAmount.setValue(sum1);
    }
  }

 // this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Receipt Voucher Saved Succesfully' });
  
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  handleChange(e) {
    this.index = e.index;
  }
}

interface GridData {
  account?: string;
  credit?: number;
  jobname?: string;
  costcenter?: string;
  narration?: string;
  id?: number;
}

interface ButtonFlag {
  edit?: boolean; cancel?: boolean; update?: boolean;
  save?: boolean; delete?: boolean;
}

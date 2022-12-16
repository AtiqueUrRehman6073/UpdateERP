import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotTableRegisterer } from '@handsontable/angular';
import { defaults } from 'src/app/shared/service/settings';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AccountApiService } from 'src/app/routes/service/account.api.service';

type SheetData = any[][];
@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.scss']
})
export class IssueReportComponent implements OnInit {
  location:any;
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private activatedroute: ActivatedRoute,
      private translate: TranslateService,
      private messageService: MessageService,
      private accountapi: AccountApiService) {
        this.location = [
          {name:'Item::1'},
          {name:'Item::2'},
          {name:'Item::3'}
          ]; 
      this.licensekey = defaults.hotlicensekey;
    }
  
    title: string;
    subtitle: string;
    breadcumbmodel: MenuItem[];
    btnlabel: string = 'Submit';
    cols: any;
    dataJson: string;
    data: SheetData;
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = '';
    ItemFormGroup: FormGroup;
    licensekey: string;
    tempVar: string = 'Eldon Base for stackable storage shelf, platinum';
  
  
    ngOnInit(): void {
      this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
      this.activatedroute.data.subscribe(data => {
        this.title = data.title;
        this.subtitle = data.title;
      });
      this.cols = [];
  
      this.ItemFormGroup = this.fb.group({
        ItemGroup: '',
        ItemName: '',
        DateFrom: '',
        DateTo: '',
        DateFormat: '',
        Brand: '',
        Location: '',
        Job: ''
      })
    }
  
    onFileChange(evt: any) {
      this.exceltoJsonConverter(evt);
      // /* wire up file reader */
      // const target: DataTransfer = <DataTransfer>(evt.target);
      // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      // const reader: FileReader = new FileReader();
      // reader.onload = (e: any) => {
      //   /* read workbook */
      //   const bstr: string = e.target.result;
      //   const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
      //   /* grab first sheet */
      //   const wsname: string = wb.SheetNames[0];
      //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
      //   /* save data */
      //   this.data = <SheetData>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      //   console.log(this.data);
      //   //this.dataJson = JSON.stringify(this.data);
      //   //console.log(this.dataJson);
      // };
      // reader.readAsBinaryString(target.files[0]);
    }
  
  
    hotid = 'stockLedgerReport';
    private hotRegisterer = new HotTableRegisterer();
    stockLedgerReport: Handsontable.GridSettings;
    stockLedgerFormGroup: FormGroup;
  
    initializeControls() {
      this.stockLedgerReport = {
        rowHeaders: true,
        viewportColumnRenderingOffset: 27,
        viewportRowRenderingOffset: 'auto',
        colWidths: 150,
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
          columns: [5],
          indicators: false
        },
        // rowHeaders: true,
        columns: [
          {
            data: 'account',
            type: 'autocomplete',
            source: (query, callback) => {
              callback(this.exceltoarray);
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
              callback(this.exceltoarray);
            },
            allowInvalid: false,
            strict: false
          },
          {
            data: 'costcenter',
            type: 'dropdown',
            source: (query, callback) => {
              callback(this.exceltoarray);
            },
          },
          {
            data: 'narration',
            type: 'text',
          },
          {
            data: 'id',
            type: 'numeric'
  
          }
        ],
        colHeaders: [
          this.translate.instant('Account'),
          this.translate.instant('Credit'),
          this.translate.instant('Job Name'),
          this.translate.instant('Cost Center'),
          this.translate.instant('Narration'),
          this.translate.instant('Id')
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
      this.stockLedgerReport.afterRemoveRow = (index: number, amount: number) => {
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
  
    export(): void {
      var i = 0, result = [];
  
      while (i < Object.keys(this.exceltoJson.sheet1).length) {
        result.push([])
        for (var key in this.exceltoJson.sheet1[i].fields) {
          result[result.length - 1].push(this.exceltoJson.sheet1[i].fields[key])
        }
        i++
      }
      this.data = result;
      /* generate worksheet */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
  
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }
  
    exceltoJson = { sheet1: {} };
    exceltoarray: Array<string> = [];
  
    exceltoJsonConverter(event: any) {
      this.exceltoJson = { sheet1: {} };
      let headerJson = {};
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      // if (target.files.length !== 1) {
      //   throw new Error('Cannot use multiple files');
      // }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      console.log("filename", target.files[0].name);
      this.exceltoJson['filename'] = target.files[0].name;
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        for (var i = 0; i < wb.SheetNames.length; ++i) {
          const wsname: string = wb.SheetNames[i];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
          this.exceltoJson[`sheet${i + 1}`] = data;
          this.exceltoarray.push[`sheet${i + 1}`] = data.toString();
          const headers = this.get_header_row(ws);
          headerJson[`header${i + 1}`] = headers;
          this.cols.push(headers);
          //  console.log("json",headers);
        }
        this.exceltoJson['headers'] = headerJson;
        console.log(this.cols);
      };
    }
  
    get_header_row(sheet) {
      var headers = [];
      var range = XLSX.utils.decode_range(sheet['!ref']);
      var C, R = range.s.r; /* start in the first row */
      /* walk every column in the range */
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        // console.log("cell",cell)
        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
        if (cell && cell.t) {
          hdr = XLSX.utils.format_cell(cell);
          headers.push(hdr);
        }
      }
      return headers;
    }
  
  
  
    get f() {
      return this.ItemFormGroup.controls;
    }
  }
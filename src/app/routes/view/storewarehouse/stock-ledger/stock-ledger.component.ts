import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { CurrencyMaster } from 'src/app/routes/domain';
import { MenuItem } from 'primeng/api/menuitem';
import { DropdownModule } from 'primeng/dropdown';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stock-ledger',
  templateUrl: './stock-ledger.component.html',
  styleUrls: ['./stock-ledger.component.scss']
})
export class StockLedgerComponent implements OnInit {
  constructor(private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private api: MasterApiService) {}
  /////////////// Changes //////////////////////
  locations: any;
  group: any;
  partNo: any;
  datedFrom:any;
  datedTo:any;
  selectedLocation: string = 'Main::1';
  btnFlag:any;
  ////////////// OLD CODE  ////////////////
  title: string;
  breadcumbmodel: MenuItem[];
  stockLedgerFormGroup: FormGroup;
  btnlabel: string = 'Submit';
  operation: { insert: boolean, update: boolean, delete: boolean } = { insert: false, update: false, delete: false };
  displayedColumns: string[] = ['code', 'name', 'rate', 'symbol', 'denomination', 'short_name', 'action'];
  currencyList: CurrencyMaster[] = [];
  ngOnInit(): void {
    this.btnFlag = {find:false,print:true,cancel:true};
    this.datedFrom = new Date(new Date().setFullYear(new Date().getFullYear() - 5));        /////   Setting Defaults for Date
    this.datedTo = new Date();
    this.operation.insert = true;
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));   /////    Setting breadcrumb
    this.activatedroute.data.subscribe(data => {                                            /////    Setting Title and Subtitle
      this.title = data.title;
    });
    this.locations = [
      { name: 'Main::1' },
      { name: 'Main::2' },
      { name: 'Main::3' }
    ];
    this.group = [
      { name: 'All' },
      { name: 'Deisel' },
      { name: 'Garnet' },
      { name: 'General' },
      { name: 'Paint' }
    ];
    this.stockLedgerFormGroup = new FormGroup({
      dateCheck: new FormControl('', Validators.required),
      zeroOpenBalanceCheck: new FormControl('', Validators.required),
      zeroBalanceCheck: new FormControl('', Validators.required),
      orderByGroupCheck: new FormControl('', Validators.required),
      printReceivedQtyCheck: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
      materialName: new FormControl('', Validators.required),
      partNo: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      itemGroup: new FormControl('', Validators.required)
    });
  }
  get f() {
    return this.stockLedgerFormGroup.controls;
  }
  reset() {
    this.operation = { insert: true, update: false, delete: false };
    this.btnlabel = 'Submit';
    this.stockLedgerFormGroup.reset();
  }

}

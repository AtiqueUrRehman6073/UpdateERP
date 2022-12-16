import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng';
import { MenuItem } from 'primeng/api/menuitem';
import { AccountApiService } from 'src/app/routes/service/account.api.service';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { StockApiService } from 'src/app/routes/service/stock-api/stock-api.service';
import { defaults } from 'src/app/shared/service/settings';

@Component({
  selector: 'app-sales-voucher',
  templateUrl: './sales-voucher.component.html',
  styleUrls: ['./sales-voucher.component.scss']
})
export class SalesVoucherComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute,
    private stockApi: StockApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private translate: TranslateService,
    private router: Router,
    private masterapi: MasterApiService,
    private accountapi: AccountApiService) {
    this.licensekey = defaults.hotlicensekey;
  }

  breadcumbmodel: MenuItem[];
  btnFlag:any;
  title:string;
  licensekey:string;
  currencyList:any;
  invoiceTlist:any;
  ngOnInit(): void {
    this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
    });
  }

}

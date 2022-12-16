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
@Component({
  selector: 'app-item-wise-profit-report',
  templateUrl: './item-wise-profit-report.component.html',
  styleUrls: ['./item-wise-profit-report.component.scss']
})
export class ItemWiseProfitReportComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private translate: TranslateService,
    private messageService: MessageService,
    private accountapi: AccountApiService) {
  }

  ngOnInit(): void {
  }

}

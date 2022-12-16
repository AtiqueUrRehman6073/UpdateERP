import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-stock-adjustment-report',
  templateUrl: './stock-adjustment-report.component.html',
  styleUrls: ['./stock-adjustment-report.component.scss']
})
export class StockAdjustmentReportComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  title: string;
  breadcumbmodel: MenuItem[];

  ngOnInit(): void {
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
    });
  }

}

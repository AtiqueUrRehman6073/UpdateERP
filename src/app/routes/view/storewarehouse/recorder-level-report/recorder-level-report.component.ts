import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-recorder-level-report',
  templateUrl: './recorder-level-report.component.html',
  styleUrls: ['./recorder-level-report.component.scss']
})
export class RecorderLevelReportComponent implements OnInit {
  index: number = 0;
  itemList:any;
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

  handleChange(e) {
    this.index = e.index;
  }

}
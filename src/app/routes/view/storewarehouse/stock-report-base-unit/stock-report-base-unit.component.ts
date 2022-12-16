import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { CurrencyMaster } from 'src/app/routes/domain';
import { MenuItem } from 'primeng/api/menuitem';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stock-report-base-unit',
  templateUrl: './stock-report-base-unit.component.html',
  styleUrls: ['./stock-report-base-unit.component.scss']
})
export class StockReportBaseUnitComponent implements OnInit {
  constructor(private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private api: MasterApiService) {
      this.getCurrencyList();
      this.locations = [
        {name:'Main::1'},
        {name:'Main::2'},
        {name:'Main::3'}
        ]; 
      this.group = [
        {name:'All'},
        {name:'Deisel'},
        {name:'Garnet'},
        {name:'General'},
        {name:'Paint'}
      ];
   }
/////////////// Changes //////////////////////
locations:any;
group:any;
partNo:any;
selectedLocation:string = 'Main::1';


title: string;
breadcumbmodel: MenuItem[];
currencyFormGroup: FormGroup;
btnlabel: string = 'Submit';
operation: {insert: boolean, update: boolean, delete: boolean} = {insert: false, update: false, delete: false};
displayedColumns: string[] = ['code', 'name', 'rate', 'symbol', 'denomination', 'short_name', 'action'];
currencyList: CurrencyMaster[] = [];
ngOnInit(): void {
this.operation.insert = true;
this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({label: k }));
this.activatedroute.data.subscribe(data => {
this.title = data.title;
});
this.currencyFormGroup = this.fb.group({
currencyMasterCurrencyId: [0],
currencyMasterCurrencyName: [null, [Validators.required]],
currencyMasterCurrencySymbol: [null],
currencyMasterCurrencyRate: [null, [Validators.required]],
currencyMasterCurrencyRemarks: [null],
currencyMasterCurrencyType: [null],
currencyMasterCurrencyUserId: [null],
currencyMasterCurrencyStatus: [null],
currencyMasterCurrencyShortName: [null, [Validators.required]],
currencyMasterCurrencyDenomination: [null, [Validators.required]]
});
}

public getCurrencyList() {
this.api.GetAllCurrency().subscribe((data) => {
this.currencyList = data;
});
}

saveCurrency() {
this.currencyFormGroup.markAsDirty();
this.currencyFormGroup.markAllAsTouched();
if (this.currencyFormGroup.valid) {
 if (this.operation.insert) {
this.insertCurrency(this.currencyFormGroup.value);
} else if (this.operation.update) {
this.updateCurrency(this.currencyFormGroup.value);
} else {
}
}

}
updateValues(data: CurrencyMaster) {
this.operation = {insert: false, update: true, delete: false};
this.btnlabel = 'Update';
this.currencyFormGroup.patchValue(data);
}
removeCurrency(data: CurrencyMaster) {
this.operation = {insert: true, update: false, delete: false};
this.btnlabel = 'Submit';
this.deleteCurrency(data);
}
public get f() {
return this.currencyFormGroup.controls;
}
public  reset() {
this.operation = {insert: true, update: false, delete: false};
this.btnlabel = 'Submit';
this.currencyFormGroup.reset();
}

public insertCurrency(currency: CurrencyMaster) {
this.api.InsertCurrency(currency).subscribe((data) => {
this.currencyList = data;
this.reset();
});
}


public updateCurrency(currency: CurrencyMaster) {
this.api.UpdateCurrency(currency).subscribe((data) => {
this.currencyList = data;
this.reset();
});
}

public deleteCurrency(currency: CurrencyMaster) {
this.btnlabel = 'Submit';
this.api.DeleteCurrency(currency).subscribe((data) => {
this.currencyList = data;
this.reset();
});
}

}

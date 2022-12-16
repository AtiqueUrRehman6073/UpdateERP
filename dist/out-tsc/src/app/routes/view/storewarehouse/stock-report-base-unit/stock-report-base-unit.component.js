import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let StockReportBaseUnitComponent = class StockReportBaseUnitComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.selectedLocation = 'Main::1';
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'rate', 'symbol', 'denomination', 'short_name', 'action'];
        this.currencyList = [];
        this.getCurrencyList();
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
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
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
    getCurrencyList() {
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
            }
            else if (this.operation.update) {
                this.updateCurrency(this.currencyFormGroup.value);
            }
            else {
            }
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.btnlabel = 'Update';
        this.currencyFormGroup.patchValue(data);
    }
    removeCurrency(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.deleteCurrency(data);
    }
    get f() {
        return this.currencyFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.currencyFormGroup.reset();
    }
    insertCurrency(currency) {
        this.api.InsertCurrency(currency).subscribe((data) => {
            this.currencyList = data;
            this.reset();
        });
    }
    updateCurrency(currency) {
        this.api.UpdateCurrency(currency).subscribe((data) => {
            this.currencyList = data;
            this.reset();
        });
    }
    deleteCurrency(currency) {
        this.btnlabel = 'Submit';
        this.api.DeleteCurrency(currency).subscribe((data) => {
            this.currencyList = data;
            this.reset();
        });
    }
};
StockReportBaseUnitComponent = __decorate([
    Component({
        selector: 'app-stock-report-base-unit',
        templateUrl: './stock-report-base-unit.component.html',
        styleUrls: ['./stock-report-base-unit.component.scss']
    })
], StockReportBaseUnitComponent);
export { StockReportBaseUnitComponent };
//# sourceMappingURL=stock-report-base-unit.component.js.map
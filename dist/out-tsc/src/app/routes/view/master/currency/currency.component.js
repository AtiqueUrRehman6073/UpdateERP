import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let CurrencyComponent = class CurrencyComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'rate', 'symbol', 'denomination', 'short_name', 'action'];
        this.currencyList = [];
        this.getCurrencyList();
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
CurrencyComponent = __decorate([
    Component({
        selector: 'app-currency',
        templateUrl: './currency.component.html',
        styleUrls: ['./currency.component.scss']
    })
], CurrencyComponent);
export { CurrencyComponent };
//# sourceMappingURL=currency.component.js.map
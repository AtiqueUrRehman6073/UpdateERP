import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let CountryComponent = class CountryComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'action'];
        this.countryList = [];
        this.getCountryist();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.countryFormGroup = this.fb.group({
            countryMasterCountryId: [0],
            countryMasterCountryName: [null, [Validators.required]],
            countryMasterCountryISDCode: [null],
            countryMasterCountryUserID: [null],
            countryMasterCountryStatus: [null],
            countryMasterCountryAmount: [null]
        });
    }
    getCountryist() {
        this.api.GetAllCountry().subscribe((data) => {
            this.countryList = data;
        });
    }
    get f() {
        return this.countryFormGroup.controls;
    }
    saveCountry() {
        this.countryFormGroup.markAllAsTouched();
        if (this.operation.insert) {
            this.insertCountry(this.countryFormGroup.value);
        }
        else if (this.operation.update) {
            this.updateCountry(this.countryFormGroup.value);
        }
        else {
            //this.toast.error('Country Master Save Failed');
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.countryFormGroup.patchValue(data);
    }
    removeCountry(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.deleteCountry(data);
    }
    get() {
        return this.countryFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.countryFormGroup.reset();
    }
    insertCountry(country) {
        this.api.InsertCountry(country).subscribe((data) => {
            this.countryList = data;
            //this.toast.success('Inserted Succesfully');
            this.countryFormGroup.reset();
        });
    }
    updateCountry(country) {
        this.api.UpdateCountry(country).subscribe((data) => {
            this.countryList = data;
            //this.toast.success('Updated Succesfully');
        });
    }
    deleteCountry(country) {
        this.api.DeleteCountry(country).subscribe((data) => {
            this.countryList = data;
            //this.toast.success('Deleted Succesfully');
        });
    }
};
CountryComponent = __decorate([
    Component({
        selector: 'app-country',
        templateUrl: './country.component.html',
        styleUrls: ['./country.component.scss']
    })
], CountryComponent);
export { CountryComponent };
//# sourceMappingURL=country.component.js.map
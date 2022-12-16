import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let CityComponent = class CityComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'action'];
        this.cityList = [];
        this.countryList = [];
        this.getCityList();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
            this.getCountryList();
        });
        this.cityFormGroup = this.fb.group({
            cityMasterCityId: [0],
            cityMasterCityCountryId: [-1, [Validators.required]],
            cityMasterCityName: [null],
            cityMasterCityDeleted: [null],
            cityMasterCityStatus: [null],
            cityCountryID: [0]
        });
    }
    getCountryList() {
        this.api.GetAllCountry().subscribe((data) => {
            this.countryList = data;
            this.countryListNew = data.map(item => ({
                label: item.countryMasterCountryName,
                value: item.countryMasterCountryId
            }));
            this.countryListNew.push({ label: 'Select', value: -1 });
        });
    }
    getCityList() {
        this.api.GetAllCity().subscribe((data) => {
            this.cityList = data;
        });
    }
    saveCity() {
        this.cityFormGroup.markAllAsTouched();
        if (this.operation.insert) {
            this.insertCity(this.cityFormGroup.value);
        }
        else if (this.operation.update) {
            this.updateCity(this.cityFormGroup.value);
        }
        else {
            //this.toast.error('Country Master Save Failed');
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.cityFormGroup.patchValue(data);
    }
    removeCity(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.deleteCity(data);
    }
    get f() {
        return this.cityFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.cityFormGroup.reset();
        this.f.cityMasterCityCountryId.setValue(-1);
    }
    insertCity(city) {
        this.api.InsertCity(city).subscribe((data) => {
            this.cityList = data;
            this.reset();
        });
    }
    updateCity(city) {
        this.api.UpdateCity(city).subscribe((data) => {
            this.cityList = data;
            this.reset();
            //this.toast.success('Updated Succesfully');
        });
    }
    deleteCity(city) {
        this.api.DeleteCity(city).subscribe((data) => {
            this.cityList = data;
            this.reset();
            //this.toast.success('Deleted Succesfully');
        });
    }
};
CityComponent = __decorate([
    Component({
        selector: 'app-city',
        templateUrl: './city.component.html',
        styleUrls: ['./city.component.scss']
    })
], CityComponent);
export { CityComponent };
//# sourceMappingURL=city.component.js.map
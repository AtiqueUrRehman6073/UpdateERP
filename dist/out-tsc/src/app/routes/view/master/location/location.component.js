import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let LocationComponent = class LocationComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'action'];
        this.locationList = [];
        this.getLocationList();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.locationFormGroup = this.fb.group({
            locationMasterLocationId: [0],
            locationMasterLocationName: [null, [Validators.required]],
            locationMasterLocationAddress: [null],
            locationMasterLocationDeleted: [null],
            locationMasterLocationStatus: [false],
            locationMasterLocationTelephone: [null],
            locationMasterLocationFax: [null],
            locationMasterLocationEmail: [null],
            locationMasterLocationCashAccount: [null],
            locationMasterLocationCostCenter: [null]
        });
    }
    get f() {
        return this.locationFormGroup.controls;
    }
    getLocationList() {
        this.api.GetAllLocation().subscribe((data) => {
            this.locationList = data;
        });
    }
    saveLocation() {
        this.locationFormGroup.markAllAsTouched();
        if (this.operation.insert) {
            this.insertLocation(this.locationFormGroup.value);
        }
        else if (this.operation.update) {
            this.updateLocation(this.locationFormGroup.value);
        }
        else {
            //this.toast.error('Currency Master Save Failed');
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.locationFormGroup.patchValue(data);
        this.btnlabel = 'Update';
    }
    removeLocation(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.deleteLocation(data);
    }
    get() {
        return this.locationFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.locationFormGroup.reset();
        this.f.locationMasterLocationStatus.setValue(false);
    }
    insertLocation(location) {
        this.api.InsertLocation(location).subscribe((data) => {
            this.locationList = data;
            this.reset();
            //this.toast.success('Inserted Succesfully');
        });
    }
    updateLocation(location) {
        this.api.UpdateLocation(location).subscribe((data) => {
            this.locationList = data;
            this.reset();
            //this.toast.success('Updated Succesfully');
        });
    }
    deleteLocation(location) {
        this.api.DeleteLocation(location).subscribe((data) => {
            this.locationList = data;
            //this.toast.success('Deleted Succesfully');
        });
    }
};
LocationComponent = __decorate([
    Component({
        selector: 'app-location',
        templateUrl: './location.component.html',
        styleUrls: ['./location.component.scss']
    })
], LocationComponent);
export { LocationComponent };
//# sourceMappingURL=location.component.js.map
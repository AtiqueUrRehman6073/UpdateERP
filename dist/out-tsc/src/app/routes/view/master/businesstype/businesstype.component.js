import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let BusinessTypeComponent = class BusinessTypeComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.checked = true;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'status', 'action'];
        this.businesstypeList = [];
        this.getAllBusinessType();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.businesstypeFormGroup = this.fb.group({
            businessTypeMasterBusinessTypeId: [0],
            businessTypeMasterBusinessTypeName: [null, [Validators.required]],
            businessTypeMasterBusinessTypeStatus: [false]
        });
    }
    getAllBusinessType() {
        this.api.GetAllBusinessType().subscribe((data) => {
            this.businesstypeList = data;
        });
    }
    savebusinesstype() {
        this.businesstypeFormGroup.markAsDirty();
        this.businesstypeFormGroup.markAllAsTouched();
        if (this.businesstypeFormGroup.valid) {
            if (this.operation.insert) {
                this.insertbusinesstype;
                this.insertbusinesstype(this.businesstypeFormGroup.value);
            }
            else if (this.operation.update) {
                this.updateBusinessType(this.businesstypeFormGroup.value);
            }
            else {
            }
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.btnlabel = 'Update';
        this.businesstypeFormGroup.patchValue(data);
    }
    removebusinesstype(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.deleteBusinessType(data);
    }
    get f() {
        return this.businesstypeFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.businesstypeFormGroup.reset();
        this.f.businessTypeMasterBusinessTypeStatus.setValue(false);
        this.f.checked.setValue(true);
    }
    insertbusinesstype(businesstype) {
        this.api.InsertBusinessType(businesstype).subscribe((data) => {
            this.businesstypeList = data;
            this.reset();
        });
    }
    updateBusinessType(businesstype) {
        this.api.UpdateBusinessType(businesstype).subscribe((data) => {
            this.businesstypeList = data;
            this.reset();
        });
    }
    deleteBusinessType(businesstype) {
        this.btnlabel = 'Submit';
        this.api.DeleteBusinessType(businesstype).subscribe((data) => {
            this.businesstypeList = data;
            businesstype;
            this.reset();
        });
    }
};
BusinessTypeComponent = __decorate([
    Component({
        selector: 'app-BusinessType',
        templateUrl: './businesstype.component.html',
        styleUrls: ['./businesstype.component.scss']
    })
], BusinessTypeComponent);
export { BusinessTypeComponent };
//# sourceMappingURL=businesstype.component.js.map
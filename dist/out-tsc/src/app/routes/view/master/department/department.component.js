import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let DepartmentComponent = class DepartmentComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'department'];
        this.departmentList = [];
        this.getDepartmentList();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.departmentFormGroup = this.fb.group({
            departmentMasterDepartmentId: [0],
            departmentMasterDepartmentCode: [null, [Validators.required]],
            departmentMasterDepartmentName: [null, [Validators.required]],
            departmentMasterDepartmentDeleted: [null],
            departmentMasterDepartmentStatus: [false]
        });
    }
    getDepartmentList() {
        this.api.GetAllDepartment().subscribe((data) => {
            this.departmentList = data;
        });
    }
    saveDepartment() {
        this.departmentFormGroup.markAsDirty();
        this.departmentFormGroup.markAllAsTouched();
        if (this.departmentFormGroup.valid) {
            if (this.operation.insert) {
                this.insertDepartment(this.departmentFormGroup.value);
            }
            else if (this.operation.update) {
                this.updateDepartment(this.departmentFormGroup.value);
            }
            else {
            }
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.btnlabel = 'Update';
        this.departmentFormGroup.patchValue(data);
    }
    removeDepartment(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.deleteDepartment(data);
    }
    get f() {
        return this.departmentFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.departmentFormGroup.reset();
    }
    insertDepartment(department) {
        this.api.InsertDepartment(department).subscribe((data) => {
            this.departmentList = data;
            this.reset();
        });
    }
    updateDepartment(department) {
        this.api.UpdateDepartment(department).subscribe((data) => {
            this.departmentList = data;
            this.reset();
        });
    }
    deleteDepartment(department) {
        this.btnlabel = 'Submit';
        this.api.DeleteDepartment(department).subscribe((data) => {
            this.departmentList = data;
            this.reset();
        });
    }
};
DepartmentComponent = __decorate([
    Component({
        selector: 'app-department',
        templateUrl: './department.component.html',
        styleUrls: ['./department.component.scss']
    })
], DepartmentComponent);
export { DepartmentComponent };
//# sourceMappingURL=department.component.js.map
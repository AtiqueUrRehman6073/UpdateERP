import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let SalesmanComponent = class SalesmanComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['salesman_code', 'salesman_name', 'contact_number', 'action'];
        this.salesmanList = [];
        this.getSalesmanList();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.salesmanFormGroup = this.fb.group({
            salesManMasterSalesManId: [0],
            salesManMasterSalesManName: [null, [Validators.required]],
            salesManMasterSalesManDeleted: [null],
            salesManMasterSalesManContactNo: [null],
            salesManMasterSalesManLocationId: [null]
        });
    }
    getSalesmanList() {
        this.api.GetAllSalesman().subscribe((data) => {
            this.salesmanList = data;
        });
    }
    saveSalesman() {
        this.salesmanFormGroup.markAllAsTouched();
        if (this.operation.insert) {
            this.insertSalesman(this.salesmanFormGroup.value);
        }
        else if (this.operation.update) {
            this.updateSalesman(this.salesmanFormGroup.value);
        }
        else {
            //this.toast.error('Country Master Save Failed');
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.salesmanFormGroup.patchValue(data);
    }
    removeSalesman(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.deleteSalesman(data);
    }
    get f() {
        return this.salesmanFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.salesmanFormGroup.reset();
    }
    insertSalesman(salesman) {
        this.api.InsertSalesman(salesman).subscribe((data) => {
            this.salesmanList = data;
            //this.toast.success('Inserted Succesfully');
            this.salesmanFormGroup.reset();
        });
    }
    updateSalesman(salesman) {
        this.api.UpdateSalesman(salesman).subscribe((data) => {
            this.salesmanList = data;
            //this.toast.success('Updated Succesfully');
        });
    }
    deleteSalesman(salesman) {
        this.api.DeleteSalesman(salesman).subscribe((data) => {
            this.salesmanList = data;
            //this.toast.success('Deleted Succesfully');
        });
    }
};
SalesmanComponent = __decorate([
    Component({
        selector: 'app-salesman',
        templateUrl: './salesman.component.html',
        styleUrls: ['./salesman.component.scss']
    })
], SalesmanComponent);
export { SalesmanComponent };
//# sourceMappingURL=salesman.component.js.map
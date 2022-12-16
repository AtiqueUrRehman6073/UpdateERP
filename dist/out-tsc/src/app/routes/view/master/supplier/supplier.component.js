import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let SupplierComponent = class SupplierComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'Mobile', 'Status', 'action'];
        this.SupplierList = [];
        this.countryListNew = [];
        this.citylistNew = [];
        this.getSupplierList();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
            this.getCountryList();
            this.getCurrencyList();
            this.getCityList();
        });
        this.supplierFormGroup = this.fb.group({
            SuppliersMasterSupplierId: [0],
            SuppliersMasterSupplierName: [null, [Validators.required]],
            SuppliersMasterSupplierContactPerson: [null],
            SuppliersMasterSupplierCountryId: [null],
            SuppliersMasterSupplierCityId: [null],
            SuppliersMasterSupplierPoBox: [null],
            SuppliersMasterSupplierTel1: [null],
            SuppliersMasterSupplierTel2: [null],
            SuppliersMasterSupplierFax: [null],
            SuppliersMasterSupplierMobile: [null],
            SuppliersMasterSupplierEmail: [null],
            SuppliersMasterSupplierWebSite: [null],
            SuppliersMasterSupplierLocation: [null, [Validators.required]],
            SuppliersMasterSupplierRemarks: [null],
            SuppliersMasterSupplierReffAcNo: [null],
            SuppliersMasterSupplierType: [null],
            SuppliersMasterSupplierUserId: [null],
            SuppliersMasterSupplierCurrencyId: [null],
            SuppliersMasterSupplierConsup: [null],
            SuppliersMasterSupplierCrl: [null],
            SuppliersMasterSupplierStatus: [false],
            SuppliersMasterSupplierDeleteStatus: [null],
            SuppliersMasterSupplierStatusValue: [null],
            SuppliersMasterSupplierPaymentTerms: [null],
            SuppliersMasterSupplierCreditDays: [null],
            SuppliersMasterSupplierCreditLimit: [null],
            SuppliersMasterSupplierVatNo: [null],
            cityMasterCityCountryId: [],
            cityMasterCityCityId: [],
            CurrencyMasterCurrencyId: [],
            suppliersMasterSupplierStatus: []
        });
    }
    getCountryList() {
        this.api.GetAllCountry().subscribe((data) => {
            this.countryList = data;
            this.countryListNew = data.map(item => ({
                label: item.countryMasterCountryName,
                value: item.countryMasterCountryId
            }));
            this.countryListNew.unshift({ label: 'Select', value: -1 });
        });
    }
    getCityList() {
        this.api.GetAllCity().subscribe((data) => {
            this.cityList = data;
            this.citylistNew = data.map(item => ({
                label: item.cityMasterCityName,
                value: item.cityMasterCityId
            }));
            this.citylistNew.unshift({ label: 'Select', value: -1 });
        });
    }
    getCurrencyList() {
        this.api.GetAllCurrency().subscribe((data) => {
            this.currencyList = data;
            this.currencylistNew = data.map(item => ({
                label: item.currencyMasterCurrencyName,
                value: item.currencyMasterCurrencyId
            }));
            this.currencylistNew.unshift({ label: 'Select', value: -1 });
        });
    }
    getSupplierList() {
        this.api.GetAllSupplier().subscribe((data) => {
            this.SupplierList = data;
        });
    }
    saveSupplier() {
        this.supplierFormGroup.markAsDirty();
        this.supplierFormGroup.markAllAsTouched();
        if (this.supplierFormGroup.valid) {
            if (this.operation.insert) {
                this.insertSupplier(this.supplierFormGroup.value);
            }
            else if (this.operation.update) {
                this.updateSupplier(this.supplierFormGroup.value);
            }
            else {
            }
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.btnlabel = 'Update';
        this.supplierFormGroup.patchValue(data);
    }
    removeSupplier(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.deleteSupplier(data);
    }
    get f() {
        return this.supplierFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.supplierFormGroup.reset();
    }
    insertSupplier(Supplier) {
        this.api.InsertSupplier(Supplier).subscribe((data) => {
            this.SupplierList = data;
            this.reset();
        });
    }
    updateSupplier(Supplier) {
        this.api.UpdateSupplier(Supplier).subscribe((data) => {
            this.SupplierList = data;
            this.reset();
        });
    }
    deleteSupplier(Supplier) {
        this.btnlabel = 'Submit';
        this.api.DeleteSupplier(Supplier).subscribe((data) => {
            this.SupplierList = data;
            this.reset();
        });
    }
    onCountryChange(event) {
        console.log(event);
        this.citylistNew = this.cityList.filter(k => k.cityMasterCityCountryId == Number(event.value)).map(item => ({
            label: item.cityMasterCityName,
            value: item.cityMasterCityId
        }));
        this.citylistNew.unshift({ label: 'Select', value: -1 });
    }
};
SupplierComponent = __decorate([
    Component({
        selector: 'app-supplier',
        templateUrl: './supplier.component.html',
        styleUrls: ['./supplier.component.scss']
    })
], SupplierComponent);
export { SupplierComponent };
//# sourceMappingURL=supplier.component.js.map
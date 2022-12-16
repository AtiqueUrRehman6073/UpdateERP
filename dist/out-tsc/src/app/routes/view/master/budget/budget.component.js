import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let BudgetComponent = class BudgetComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'short_name', 'action'];
        this.BudgetList = [];
        this.getBudgetList();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.BudgetFormGroup = this.fb.group({
            budgetMasterBudgetId: [0],
            budgetMasterBudgetName: [null, [Validators.required]]
        });
    }
    getBudgetList() {
        this.api.GetAllBudget().subscribe((data) => {
            this.BudgetList = data;
        });
    }
    saveBudget() {
        this.BudgetFormGroup.markAsDirty();
        this.BudgetFormGroup.markAllAsTouched();
        if (this.BudgetFormGroup.valid) {
            if (this.operation.insert) {
                this.insertBudget(this.BudgetFormGroup.value);
            }
            else if (this.operation.update) {
                this.updateBudget(this.BudgetFormGroup.value);
            }
            else {
            }
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.btnlabel = 'Update';
        this.BudgetFormGroup.patchValue(data);
    }
    removeBudget(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.deleteBudget(data);
    }
    get f() {
        return this.BudgetFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.BudgetFormGroup.reset();
    }
    insertBudget(Budget) {
        this.api.InsertBudget(Budget).subscribe((data) => {
            this.BudgetList = data;
            this.reset();
        });
    }
    updateBudget(Budget) {
        this.api.UpdateBudget(Budget).subscribe((data) => {
            this.BudgetList = data;
            this.reset();
        });
    }
    deleteBudget(Budget) {
        this.btnlabel = 'Submit';
        this.api.DeleteBudget(Budget).subscribe((data) => {
            this.BudgetList = data;
            this.reset();
        });
    }
};
BudgetComponent = __decorate([
    Component({
        selector: 'app-budget',
        templateUrl: './budget.component.html',
        styleUrls: ['./budget.component.scss']
    })
], BudgetComponent);
export { BudgetComponent };
//# sourceMappingURL=budget.component.js.map
import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let ProjectdescriptionComponent = class ProjectdescriptionComponent {
    constructor(activatedroute, fb, router, api) {
        this.activatedroute = activatedroute;
        this.fb = fb;
        this.router = router;
        this.api = api;
        this.btnlabel = 'Submit';
        this.operation = { insert: false, update: false, delete: false };
        this.displayedColumns = ['code', 'name', 'rate', 'symbol', 'denomination', 'short_name', 'action'];
        this.projectdescriptionList = [];
        this.getAllProjectDescription();
    }
    ngOnInit() {
        this.operation.insert = true;
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.projectdescriptionFormGroup = this.fb.group({
            projectDescriptionMasterProjectDescriptionId: [0],
            projectDescriptionMasterProjectDescriptionName: [null, [Validators.required]],
            projectDescriptionMasterProjectDescriptionSortOrder: [null],
            projectDescriptionMasterProjectDescriptionStatus: [false]
        });
    }
    getAllProjectDescription() {
        this.api.GetAllProjectDesc().subscribe((data) => {
            this.projectdescriptionList = data;
        });
    }
    saveprojectdescription() {
        this.projectdescriptionFormGroup.markAsDirty();
        this.projectdescriptionFormGroup.markAllAsTouched();
        if (this.projectdescriptionFormGroup.valid) {
            if (this.operation.insert) {
                this.insertProjectDescription;
                this.insertProjectDescription(this.projectdescriptionFormGroup.value);
            }
            else if (this.operation.update) {
                this.updateProjectDescription(this.projectdescriptionFormGroup.value);
            }
            else {
            }
        }
    }
    updateValues(data) {
        this.operation = { insert: false, update: true, delete: false };
        this.btnlabel = 'Update';
        this.projectdescriptionFormGroup.patchValue(data);
    }
    removeprojectdescription(data) {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.deleteProjectDescription(data);
    }
    get f() {
        return this.projectdescriptionFormGroup.controls;
    }
    reset() {
        this.operation = { insert: true, update: false, delete: false };
        this.btnlabel = 'Submit';
        this.projectdescriptionFormGroup.reset();
    }
    insertProjectDescription(projectdescription) {
        this.api.InsertProjectDesc(projectdescription).subscribe((data) => {
            this.projectdescriptionList = data;
            this.reset();
        });
    }
    updateProjectDescription(projectdescription) {
        this.api.UpdateProjectDesc(projectdescription).subscribe((data) => {
            this.projectdescriptionList = data;
            this.reset();
        });
    }
    deleteProjectDescription(projectdescription) {
        this.btnlabel = 'Submit';
        this.api.DeleteProjectDesc(projectdescription).subscribe((data) => {
            this.projectdescriptionList = data;
            this.reset();
        });
    }
};
ProjectdescriptionComponent = __decorate([
    Component({
        selector: 'app-projectdescription',
        templateUrl: './projectdescription.component.html',
        styleUrls: ['./projectdescription.component.scss']
    })
], ProjectdescriptionComponent);
export { ProjectdescriptionComponent };
//# sourceMappingURL=projectdescription.component.js.map
import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TermsandconditionComponent = class TermsandconditionComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.displayedColumns = ['code', 'terms_condition', 'action'];
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
TermsandconditionComponent = __decorate([
    Component({
        selector: 'app-termsandcondition',
        templateUrl: './termsandcondition.component.html',
        styleUrls: ['./termsandcondition.component.scss']
    })
], TermsandconditionComponent);
export { TermsandconditionComponent };
//# sourceMappingURL=termsandcondition.component.js.map
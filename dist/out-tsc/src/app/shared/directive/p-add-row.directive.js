import { __decorate } from "tslib";
import { Directive, Input, HostListener } from '@angular/core';
let PAddRowDirective = class PAddRowDirective {
    onClick(event) {
        // Insert a new row
        this.table.value.push(this.newRow);
        // Set the new row in edit mode
        this.table.initRowEdit(this.newRow);
        event.preventDefault();
    }
    ngAfterViewInit() {
        // Insert a new row
        this.table.value.push(this.initRow);
        // Set the new row in edit mode
        this.table.initRowEdit(this.initRow);
    }
};
__decorate([
    Input()
], PAddRowDirective.prototype, "table", void 0);
__decorate([
    Input()
], PAddRowDirective.prototype, "newRow", void 0);
__decorate([
    Input()
], PAddRowDirective.prototype, "initRow", void 0);
__decorate([
    HostListener('click', ['$event'])
], PAddRowDirective.prototype, "onClick", null);
PAddRowDirective = __decorate([
    Directive({
        selector: '[appPAddRow]'
    })
], PAddRowDirective);
export { PAddRowDirective };
//# sourceMappingURL=p-add-row.directive.js.map
import { __decorate, __param } from "tslib";
import { Directive, Host, Self, HostListener, Input } from '@angular/core';
let UseUtcDirective = class UseUtcDirective {
    constructor(calendar) {
        this.calendar = calendar;
    }
    onSelect() {
        this.toUtc();
    }
    onInput() {
        this.toUtc();
    }
    toUtc() {
        this.calendar.value = new Date(Date.UTC(this.calendar.value.getFullYear(), this.calendar.value.getMonth(), this.calendar.value.getDate(), 0, 0, 0));
        this.calendar.updateModel(this.calendar.value);
    }
};
__decorate([
    Input()
], UseUtcDirective.prototype, "time", void 0);
__decorate([
    HostListener('onSelect', ['$event'])
], UseUtcDirective.prototype, "onSelect", null);
__decorate([
    HostListener('onInput', ['$event'])
], UseUtcDirective.prototype, "onInput", null);
UseUtcDirective = __decorate([
    Directive({
        selector: '[useUtc]'
    }),
    __param(0, Host()),
    __param(0, Self())
], UseUtcDirective);
export { UseUtcDirective };
//# sourceMappingURL=use-utc.directive.js.map
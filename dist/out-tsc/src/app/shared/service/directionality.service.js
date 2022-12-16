import { __decorate } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
let AppDirectionality = class AppDirectionality {
    constructor() {
        this.change = new EventEmitter();
        this._value = 'ltr';
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.change.next(value);
    }
    ngOnDestroy() {
        this.change.complete();
    }
};
AppDirectionality = __decorate([
    Injectable()
], AppDirectionality);
export { AppDirectionality };
//# sourceMappingURL=directionality.service.js.map
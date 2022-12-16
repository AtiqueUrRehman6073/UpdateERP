import { __decorate, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from './interceptors/default.interceptor';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { RouterModule } from '@angular/router';
let CoreModule = class CoreModule {
    constructor(parentModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
};
CoreModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule, FormsModule, OverlayModule, RouterModule,
            ReactiveFormsModule,
        ],
        providers: [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },],
        exports: []
    }),
    __param(0, Optional()),
    __param(0, SkipSelf())
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map
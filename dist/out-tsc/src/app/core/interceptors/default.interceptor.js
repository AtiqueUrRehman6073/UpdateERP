import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse, } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
/** Pass untouched request through to the next request handler. */
let DefaultInterceptor = class DefaultInterceptor {
    constructor(loadingService) {
        this.loadingService = loadingService;
    }
    intercept(req, next) {
        let loadingRef;
        Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
        return next.handle(req).pipe(mergeMap((event) => {
            if (event instanceof HttpResponse && loadingRef) {
                loadingRef.close();
            }
            return of(event);
        }), catchError((err) => {
            if (loadingRef) {
                loadingRef.close();
            }
            return of(err);
        }));
    }
};
DefaultInterceptor = __decorate([
    Injectable()
], DefaultInterceptor);
export { DefaultInterceptor };
//# sourceMappingURL=default.interceptor.js.map
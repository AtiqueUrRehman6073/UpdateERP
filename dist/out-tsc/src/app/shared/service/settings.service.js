import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { defaults } from './settings';
let SettingsService = class SettingsService {
    constructor() {
        this.notice$ = new Subject();
        this.options = defaults;
        this._notify$ = new BehaviorSubject({});
    }
    get notify() {
        return this._notify$.asObservable();
    }
    get notice() {
        return this.notice$.asObservable();
    }
    setLayout(options) {
        this.options = Object.assign(defaults, options);
        return this.options;
    }
    setNavState(type, value) {
        this.notice$.next({ type, value });
    }
    getOptions() {
        return this.options;
    }
    setLanguage(lang) {
        this.options.language = lang;
        this._notify$.next({ lang });
    }
};
SettingsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SettingsService);
export { SettingsService };
//# sourceMappingURL=settings.service.js.map
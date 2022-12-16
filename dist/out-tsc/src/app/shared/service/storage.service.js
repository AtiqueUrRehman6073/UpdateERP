import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let LocalStorageService = class LocalStorageService {
    get(key) {
        return JSON.parse(localStorage.getItem(key) || '{}') || {};
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
};
LocalStorageService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LocalStorageService);
export { LocalStorageService };
//# sourceMappingURL=storage.service.js.map
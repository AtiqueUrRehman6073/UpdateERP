import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let StockApiService = class StockApiService {
    constructor(http) {
        this.http = http;
    }
    getStockLedgerReport() {
        return this.http.post('http://localhost:53447/api/Stock/getStockLedgerReport', '');
    }
    getFilteredStockLedgerRpt(payload) {
        return this.http.post('http://localhost:53447/api/Stock/getFilteredStockLedgerRpt', payload);
    }
    getStockMovementDetailsRpt(payload) {
        return this.http.post('http://localhost:53447/api/Stock/getStockMovementDetailsRpt', payload);
    }
    getDetailsByItem(payload) {
        return this.http.post('http://localhost:53447/api/Stock/getDetailsByItem', payload);
    }
    getStockVchDetails(payload) {
        console.log(payload);
        return this.http.post('http://localhost:53447/api/Stock/getStockVchDetails', payload);
    }
    getAllItemsList() {
        return this.http.get('http://localhost:53447/api/Stock/getAllItems');
    }
    getAllJobs() {
        return this.http.get('http://localhost:53447/api/Job/GetAllJob');
    }
    getAllDepartments() {
        return this.http.get('http://localhost:53447/api/Stock/getAllDepartments');
    }
    customerEnquiryReport() {
        return this.http.get('http://localhost:53447/api/Stock/customerEnquiryReport');
    }
};
StockApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StockApiService);
export { StockApiService };
//# sourceMappingURL=stock-api.service.js.map
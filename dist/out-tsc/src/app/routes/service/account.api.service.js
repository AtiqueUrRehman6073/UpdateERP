import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountsUrls } from './url.api';
import { delay } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};
let AccountApiService = class AccountApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = environment.apiRootURL;
    }
    GetAllAcounts() {
        return this.httpClient.get(this.baseUrl + AccountsUrls.GetAllAccounts);
    }
    InsertReceiptVoucher(data1) {
        return this.httpClient.post(this.baseUrl + AccountsUrls.InsertReceiptVoucher, data1, httpOptions);
    }
    DeleteReceiptVoucher(data1) {
        return this.httpClient.post(this.baseUrl + AccountsUrls.DeleteReceiptVoucher, data1, httpOptions);
    }
    UpdateReceiptVoucher(data1) {
        return this.httpClient.post(this.baseUrl + AccountsUrls.UpdateReceiptVoucher, data1, httpOptions);
    }
    GetReceiptVouchers() {
        return this.httpClient.get(this.baseUrl + AccountsUrls.GetReceiptVouchers);
    }
    GetSavedReceiptDetails(id) {
        return this.httpClient.get(this.baseUrl + AccountsUrls.GetSavedReceiptDetails + '/' + id);
    }
    InsertPaymentVoucher(data1) {
        return this.httpClient.post(this.baseUrl + AccountsUrls.InsertPaymentVoucher, data1, httpOptions);
    }
    DeletePaymentVoucher(data1) {
        return this.httpClient.post(this.baseUrl + AccountsUrls.DeletePaymentVoucher, data1, httpOptions);
    }
    UpdatePaymentVoucher(data1) {
        return this.httpClient.post(this.baseUrl + AccountsUrls.UpdatePaymentVoucher, data1, httpOptions);
    }
    GetAllAcountTransactions() {
        return this.httpClient.get(this.baseUrl + AccountsUrls.GetAllAccountTransaction);
    }
    GetPaymentVouchers() {
        return this.httpClient.get(this.baseUrl + AccountsUrls.GetPaymentVouchers);
    }
    GetSavedPaymentDetails(id) {
        return this.httpClient.get(this.baseUrl + AccountsUrls.GetSavedPaymentDetails + '/' + id);
    }
    CheckVnoExist(vno) {
        return this.httpClient.get(this.baseUrl + AccountsUrls.CheckVnoExist + '/' + vno).pipe(delay(400));
    }
};
AccountApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AccountApiService);
export { AccountApiService };
//# sourceMappingURL=account.api.service.js.map
import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterUrls, UserUrls, WorkGroupUrls } from './url.api';
import { environment } from 'src/environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};
let MasterApiService = class MasterApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = environment.apiRootURL;
    }
    GetAllCurrency() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllCurrency);
    }
    GetAllJob() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllJob);
    }
    GetAllCostCenter() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllCostCenter);
    }
    // Save general Consent pdf  Data
    InsertCurrency(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertCurrency, data, httpOptions);
    }
    UpdateCurrency(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateCurrency, data, httpOptions);
    }
    DeleteCurrency(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteCurrency, data, httpOptions);
    }
    getItemTreeNode() {
        return this.httpClient.get('assets/demo/data/files.json')
            .toPromise()
            .then((res) => res.data);
    }
    getItemsParentTreeNode() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllItem);
    }
    GetAllItemByName(data) {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllItemByName + '/' + data);
    }
    GetAllUnit() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllUnit);
    }
    GetAllPriceLevel() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllPriceLevel);
    }
    getItemsChildrenByParentTreeNode(id) {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllItemById + '/' + id);
    }
    InsertItem(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertItem, data, httpOptions);
    }
    GetAllBrand() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllBrand);
    }
    GetAllItemStock() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllItemStockType);
    }
    GetAllBudget() {
        // let params = new HttpParams();  MasterUrls
        // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
        // { params: params }
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllBudget);
    }
    // Save general Consent pdf  Data
    InsertBudget(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertBudget, data, httpOptions);
    }
    UpdateBudget(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateBudget, data, httpOptions);
    }
    DeleteBudget(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteBudget, data, httpOptions);
    }
    GetAllCity() {
        // let params = new HttpParams();  MasterUrls
        // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
        // { params: params }
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllCity);
    }
    // Save general Consent pdf  Data
    InsertCity(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertCity, data, httpOptions);
    }
    UpdateCity(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateCity, data, httpOptions);
    }
    DeleteCity(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteCity, data, httpOptions);
    }
    GetAllCountry() {
        // let params = new HttpParams();  MasterUrls
        // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
        // { params: params }
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllCountry);
    }
    // Save general Consent pdf  Data
    InsertCountry(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertCountry, data, httpOptions);
    }
    UpdateCountry(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateCountry, data, httpOptions);
    }
    DeleteCountry(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteCountry, data, httpOptions);
    }
    GetAllLocation() {
        // let params = new HttpParams();  MasterUrls
        // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
        // { params: params }
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllLocation);
    }
    // Save general Consent pdf  Data
    InsertLocation(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertLocation, data, httpOptions);
    }
    UpdateLocation(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateLocation, data, httpOptions);
    }
    DeleteLocation(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteLocation, data, httpOptions);
    }
    GetAllSalesman() {
        // let params = new HttpParams();  MasterUrls
        // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
        // { params: params }
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllSalesman);
    }
    // Save general Consent pdf  Data
    InsertSalesman(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertSalesman, data, httpOptions);
    }
    UpdateSalesman(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateSalesman, data, httpOptions);
    }
    DeleteSalesman(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteSalesman, data, httpOptions);
    }
    GetAllCustomer() {
        // let params = new HttpParams();  MasterUrls
        // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
        // { params: params }
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllCustomer);
    }
    // Save general Consent pdf  Data
    InsertCustomer(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertCustomer, data, httpOptions);
    }
    UpdateCustomer(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateCustomer, data, httpOptions);
    }
    DeleteCustomer(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteCustomer, data, httpOptions);
    }
    GetAllSupplier() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllSupplier);
    }
    InsertSupplier(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertSupplier, data, httpOptions);
    }
    UpdateSupplier(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateSupplier, data, httpOptions);
    }
    DeleteSupplier(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteSupplier, data, httpOptions);
    }
    GetSupplierDetailsByItemId(id) {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetSupplierDetailsByItemId + '/' + id);
    }
    GetAllProjectDesc() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllProjectDesc);
    }
    InsertProjectDesc(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertProjectDesc, data, httpOptions);
    }
    UpdateProjectDesc(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateProjectDesc, data, httpOptions);
    }
    DeleteProjectDesc(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteProjectDesc, data, httpOptions);
    }
    GetAllBusinessType() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllBusinessType);
    }
    InsertBusinessType(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertBusinessType, data, httpOptions);
    }
    UpdateBusinessType(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateBusinessType, data, httpOptions);
    }
    DeleteBusinessType(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteBusinessType, data, httpOptions);
    }
    GetAllUser() {
        return this.httpClient.get(this.baseUrl + UserUrls.GetAllUser);
    }
    // Save general Consent pdf  Data
    InsertUser(data) {
        return this.httpClient.post(this.baseUrl + UserUrls.InsertUser, data, httpOptions);
    }
    UpdateUser(data) {
        return this.httpClient.post(this.baseUrl + UserUrls.UpdateUser, data, httpOptions);
    }
    DeleteUser(data) {
        return this.httpClient.post(this.baseUrl + UserUrls.DeleteUser, data, httpOptions);
    }
    GetAllWorkGroup() {
        return this.httpClient.get(this.baseUrl + WorkGroupUrls.GetAllWorkGroup);
    }
    GetAllDepartment() {
        return this.httpClient.get(this.baseUrl + MasterUrls.GetAllDepartment);
    }
    InsertDepartment(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.InsertDepartment, data, httpOptions);
    }
    UpdateDepartment(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.UpdateDepartment, data, httpOptions);
    }
    DeleteDepartment(data) {
        return this.httpClient.post(this.baseUrl + MasterUrls.DeleteDepartment, data, httpOptions);
    }
};
MasterApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MasterApiService);
export { MasterApiService };
//# sourceMappingURL=master.api.services.js.map
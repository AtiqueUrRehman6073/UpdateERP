import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private http: HttpClient) { }

  getStockLedgerReport() {
    environment.apiRootURL
    return this.http.post(environment.apiRootURL + 'Stock/getStockLedgerReport', '');
  }
  getFilteredStockLedgerRpt(payload: any) {
    return this.http.post(environment.apiRootURL + 'Stock/getFilteredStockLedgerRpt', payload);
  }
  getStockMovementDetailsRpt(payload: any) {
    return this.http.post(environment.apiRootURL + 'Stock/getStockMovementDetailsRpt', payload);
  }
  getDetailsByItem(payload: any) {
    return this.http.post(environment.apiRootURL + 'Stock/getDetailsByItem', payload);
  }
  getStockVchDetails(payload: any) {
    console.log(payload);
    return this.http.post(environment.apiRootURL + 'Stock/getStockVchDetails', payload);
  }
  getAllItemsList() {
    return this.http.get(environment.apiRootURL + 'Stock/getAllItems');
  }
  getAllDepartments() {
    return this.http.get(environment.apiRootURL + 'Stock/getAllDepartments');
  }
  customerEnquiryReport() {
    return this.http.get(environment.apiRootURL + 'Stock/customerEnquiryReport');
  }
  getAllJobs() {
    return this.http.get(environment.apiRootURL + 'Job/GetAllJob');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private http:HttpClient) { }

  getStockLedgerReport(){
    return this.http.post('http://localhost:53447/api/Stock/getStockLedgerReport','');
  }
  getFilteredStockLedgerRpt(payload:any){
    return this.http.post('http://localhost:53447/api/Stock/getFilteredStockLedgerRpt',payload);
  }
  getStockMovementDetailsRpt(payload:any){
    return this.http.post('http://localhost:53447/api/Stock/getStockMovementDetailsRpt',payload);
  }
  getDetailsByItem(payload:any){
    return this.http.post('http://localhost:53447/api/Stock/getDetailsByItem',payload);
  }
  getStockVchDetails(payload:any){
    console.log(payload);
    return this.http.post('http://localhost:53447/api/Stock/getStockVchDetails',payload);
  }
  getAllItemsList(){
    return this.http.get('http://localhost:53447/api/Stock/getAllItems');
  }
  getAllJobs(){
    return this.http.get('http://localhost:53447/api/Job/GetAllJob');
  }
  getAllDepartments(){
    return this.http.get('http://localhost:53447/api/Stock/getAllDepartments');
  }
  customerEnquiryReport(){
    return this.http.get('http://localhost:53447/api/Stock/customerEnquiryReport');
  }
}

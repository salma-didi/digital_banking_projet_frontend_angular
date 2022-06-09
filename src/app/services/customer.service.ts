import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer, CustomerAccounts} from "../model/customer.model";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
     return this.http.get<Array<Customer>>(environment.baseURL+"/customers")
  }

  public getCustomersByKeyword(keyword:String):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.baseURL+"/customers/search?keyword="+keyword)
  }


  public saveCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.baseURL+"/customers",customer)
  }

  public deleteCustomer(Id_customer:number){
    return this.http.delete(environment.baseURL+"/customers/"+Id_customer)
  }
  public getCustomerAccounts(customerId : number):Observable<Customer>{
    return this.http.get<Customer>(environment.baseURL+"/customers/"+customerId+"/accounts");
  }
  public getCustomer(customerId: number):Observable<Customer>{
    return this.http.get<Customer>(environment.baseURL+"/customers/"+customerId);
  }
}

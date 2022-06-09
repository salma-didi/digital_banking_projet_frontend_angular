import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/account.model";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.baseURL+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.baseURL+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.baseURL+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.baseURL+"/accounts/transfer",data);
  }

  public saveCurrentAccount(balance:number,overDraft:number,customerId:number) {
    let account={balance,overDraft};
    return this.http.post(environment.baseURL+"/customers/"+customerId+"/CurrentAccount",account);
  }

  public saveSavingAccount(balance:number,interestRate:number,customerId:number) {
    let account={balance,interestRate};
    return this.http.post(environment.baseURL+"/customers/"+customerId+"/SavingAccount",account);  }
}

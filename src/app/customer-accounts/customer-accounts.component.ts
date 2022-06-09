import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer, CustomerAccounts} from "../model/customer.model";
import {catchError, Observable, throwError} from "rxjs";
import {CustomerService} from "../services/customer.service";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId! : number;
  customer! : Customer;
  CustomeraccountsObservable! : Observable<Customer>
  errorMessage! :string ;

  constructor(private route : ActivatedRoute, private router :Router, private customerService:CustomerService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.CustomeraccountsObservable=this.customerService.getCustomerAccounts(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return  throwError(err);
      })
    );
  }


}

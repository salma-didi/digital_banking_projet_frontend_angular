import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {Customer} from "../model/customer.model";
import {AccountDetails} from "../model/account.model";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  newAccountFormGroup!: FormGroup;
  typeAccountFromGroup! : FormGroup;
  errorMessage! :string ;
  cutomer!: Observable<Customer>;

  constructor(private formBuilder:FormBuilder,private accountService:AccountService,private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.newAccountFormGroup=this.formBuilder.group({
      customerId : this.formBuilder.control(''),

    });
    this.typeAccountFromGroup=this.formBuilder.group({
      balance:this.formBuilder.control(0,[Validators.required]),
      accountType:this.formBuilder.control(null,[Validators.required,Validators.maxLength(20)]),
      overDraft:this.formBuilder.control(0,[Validators.required]),
      interestRate:this.formBuilder.control(0,[Validators.required]),

    });
  }

  handleSearchCutomer() {
    let cutomerId : number =this.newAccountFormGroup.value.customerId;
    this.cutomer=this.customerService.getCustomer(cutomerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return  throwError(err);
      })
    );
  }


  handleAccountType() {
    let cutomerId : number =this.newAccountFormGroup.value.customerId;
    let accountBalance: number =this.typeAccountFromGroup.value.balance;
    let accountType: String =this.typeAccountFromGroup.value.accountType;
    let overDraft: number =this.typeAccountFromGroup.value.overDraft;
    let interestRate: number =this.typeAccountFromGroup.value.interestRate;

    if(accountType=='CURRENT'){
      this.accountService.saveCurrentAccount(accountBalance,overDraft,cutomerId).subscribe({
        next : (data)=>{
          alert("Success account added");
          this.typeAccountFromGroup.reset();
          this.newAccountFormGroup;
        },
        error : (err)=>{
          console.log(err);
        }
      });
    } else if(accountType=='SAVING'){
      this.accountService.saveSavingAccount(accountBalance,interestRate,cutomerId).subscribe({
        next : (data)=>{
          alert("Success account added");
          this.typeAccountFromGroup.reset();
          this.newAccountFormGroup;
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }

  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup!: FormGroup;
  constructor(private formBuilder:FormBuilder,private cutomerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup=this.formBuilder.group({
      name:this.formBuilder.control(null,[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      email:this.formBuilder.control(null,[Validators.required,Validators.email]),

    });
  }

  handleSaveCustomer() {
   let customer:Customer=this.newCustomerFormGroup.value;
   this.cutomerService.saveCustomer(customer).subscribe({
     next:data=>{
       alert("customer has been successfuly saved");
       //this.newCustomerFormGroup.reset();
       this.router.navigateByUrl("/customers");
     },
     error:err=>{
       console.log(err);
     }
   })
  }
}

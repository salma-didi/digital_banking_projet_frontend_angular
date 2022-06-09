import {AccountOperation} from "./account.model";

export interface Customer{
  id: number;
  name: String;
  email: String;
  customerAccountsDTO :CustomerAccounts[];
}
export interface CustomerAccounts{
  id : number;
  type: String;
  balance: number;
  createdAt:Date;
}

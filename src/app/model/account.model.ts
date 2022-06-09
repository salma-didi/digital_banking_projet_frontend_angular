export interface AccountDetails {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  type:                 String;
  accountOperationsDTOS: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}

export class Customer {
  id: number;
  name: string;
  number: string;
}
export class CustomerResponse {
  customers: Customer[];
  count: number;
}

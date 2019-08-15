import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Customer, CustomerResponse } from './Customer';


export abstract class DataService extends BehaviorSubject<GridDataResult> {
  public loading: boolean;

  // private BASE_URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/';

  constructor(private http: HttpClient) {
    super(null);
  }

  private BASE_URL: string = 'http://localhost:60991/api/customers';

  public query(state): void {
    this.getEmployee(state).subscribe(x => super.next(x));
  }

  public getEmployee(state: any): Observable<GridDataResult> {
    return this.http.get(`${this.BASE_URL}?skip=${state.skip}&take=${state.take}`).pipe(
      // map(response=>{ debugger ;console.log(JSON.stringify(response)); }),
      map(
        response =>
        <GridDataResult>{
            data: response['customers'],
            total: parseInt(response['count'], 10)
          }

      )
    );
  }
}

@Injectable()
export class DataService1 extends DataService {
    constructor(http: HttpClient) { super(http); }
}

// @Injectable()
// export  class DataService extends BehaviorSubject<GridDataResult> {
//   public loading: boolean;

//   constructor(private http: HttpClient) {
//     super(null);
//   }

//   private BASE_URL: string = 'http://localhost:60991/api/customers';

//   public query(state): Observable<CustomerResponse> {
//     return this.getEmployee(state);
//   }

//   private getEmployee(state: any): Observable<CustomerResponse> {
//     return this.http.get(`${this.BASE_URL}?skip=${state.skip}&take=${state.take}`).pipe(
//       // map(response=>{ console.log(JSON.stringify(response)); debugger ;}),
//       map(
//         response =>
//           <CustomerResponse>{
//             customers: response['customers'],
//             count: parseInt(response['count'], 10)
//           }
//       )
//     );
//   }
// }

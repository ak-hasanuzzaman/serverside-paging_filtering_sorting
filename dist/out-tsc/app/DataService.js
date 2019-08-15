var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
var DataService = /** @class */ (function (_super) {
    __extends(DataService, _super);
    // private BASE_URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/';
    function DataService(http) {
        var _this = _super.call(this, null) || this;
        _this.http = http;
        _this.BASE_URL = 'http://localhost:60991/api/customers';
        return _this;
    }
    DataService.prototype.query = function (state) {
        var _this = this;
        this.getEmployee(state).subscribe(function (x) { return _super.prototype.next.call(_this, x); });
    };
    DataService.prototype.getEmployee = function (state) {
        return this.http.get(this.BASE_URL + "?skip=" + state.skip + "&take=" + state.take).pipe(
        // map(response=>{ debugger ;console.log(JSON.stringify(response)); }),
        map(function (response) {
            return ({
                data: response['customers'],
                total: parseInt(response['count'], 10)
            });
        }));
    };
    return DataService;
}(BehaviorSubject));
export { DataService };
var DataService1 = /** @class */ (function (_super) {
    __extends(DataService1, _super);
    function DataService1(http) {
        return _super.call(this, http) || this;
    }
    DataService1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService1);
    return DataService1;
}(DataService));
export { DataService1 };
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
//# sourceMappingURL=DataService.js.map
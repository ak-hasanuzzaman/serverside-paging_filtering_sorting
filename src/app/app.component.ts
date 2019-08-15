import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';

import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Customer, CustomerResponse } from './Customer';
import { DataService, DataService1 } from './DataService';
import { sampleProducts } from './products';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
    <kendo-grid
      [data]="gridData"
      [loading]="loading"
      [pageSize]="state.take"
      [skip]="state.skip"
      [sort]="state.sort"
      [filter]="state.filter"
      filterable="menu"
      [pageable]="{
        buttonCount: buttonCount,
        info: info,
        type: type,
        pageSizes: pageSizes,
        previousNext: previousNext
      }"
      [sortable]="true"
      (dataStateChange)="dataStateChange($event)"
    >
      <kendo-grid-column field="id" title="ID" width="80" [filterable]="false"></kendo-grid-column>
      <kendo-grid-column field="name" title="Name"></kendo-grid-column>
      <kendo-grid-column field="number" title="Number"></kendo-grid-column>
    </kendo-grid>
  `
})
export class AppComponent {
  public buttonCount = 15;
  public info = true;
  public type: 'numeric' | 'input' = 'input';
  public loading = true;
  public pageSizes = [20, 50, 60];
  public previousNext = true;

  public state: State = {
    skip: 0,
    take: 20,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'name', operator: 'contains', value: 'nu' }]
    }
  };
  customers: Customer[] = [];
  customerResponse: CustomerResponse;
  count: number;
  public view: Observable<GridDataResult>;
  gridData: GridDataResult;

  constructor(private service: DataService1) {
    this.view = service;
  }
  private loaddata(r: GridDataResult): void {
    if (!r) return;

    if (this.state.filter.filters.length > 0) {
      this.gridData = process(r.data, this.state);
    } else {
      this.gridData = process(r.data, this.state);
      this.gridData.data = r.data;
      this.gridData.total = r.total;
    }
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.service.query(this.state);

    this.loading = true;

    this.view.subscribe(r => {
      this.loaddata(r);
    });

  }
  ngOnInit() {
    
    this.service.query(this.state);
    
    this.loading = true;

    this.view.subscribe(r => {
      this.loading = false;
      this.loaddata(r);
    });

  }
  // constructor(private service: DataService) {
  //   this.view = service;
  // }

  // ngOnInit() {
  //   this.service.query(this.state).subscribe(response => {
  //     this.loading = false;

  //     this.customerResponse = response;
  //     this.customers = this.customerResponse.customers;
  //     this.count = this.customerResponse.count;
  //     if (this.state.filter.filters.length > 0) {
  //       this.gridData = process(this.customers, this.state);
  //     } else {
  //       this.gridData = process(this.customers, this.state);
  //       this.gridData.data = this.customers;
  //       this.gridData.total = this.count;
  //     }
  //   });
  // }

  // public gridData: GridDataResult;
  // public view: Observable<GridDataResult>;

  // public dataStateChange(state: DataStateChangeEvent): void {
  //   this.state = state;
  //   this.loading = true;
  //   this.service.query(this.state).subscribe(response => {
  //     this.loading = false;
  //     this.customerResponse = response;
  //     this.customers = this.customerResponse.customers;
  //     this.count = this.customerResponse.count;
  //     if (this.state.filter.filters.length > 0) {
  //       this.gridData = process(this.customers, this.state);
  //     } else {
  //       this.gridData = process(this.customers, this.state);
  //       this.gridData.data = this.customers;
  //       this.gridData.total = this.count;
  //     }
  //   });
  // }
}

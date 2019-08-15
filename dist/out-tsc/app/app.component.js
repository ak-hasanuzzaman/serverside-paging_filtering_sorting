var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { DataService1 } from './DataService';
var AppComponent = /** @class */ (function () {
    function AppComponent(service) {
        this.service = service;
        this.buttonCount = 15;
        this.info = true;
        this.type = 'input';
        this.loading = true;
        this.pageSizes = [20, 50, 60];
        this.previousNext = true;
        this.state = {
            skip: 0,
            take: 20,
            // Initial filter descriptor
            filter: {
                logic: 'and',
                filters: [{ field: 'name', operator: 'contains', value: 'Vidar' }]
            }
        };
        this.customers = [];
        this.view = service;
    }
    AppComponent.prototype.loaddata = function (r) {
        if (r) {
            if (this.state.filter.filters.length > 0) {
                this.gridData = process(r.data, this.state);
            }
            else {
                this.gridData = process(r.data, this.state);
                this.gridData.data = r.data;
                this.gridData.total = r.total;
            }
        }
    };
    AppComponent.prototype.dataStateChange = function (state) {
        var _this = this;
        this.state = state;
        this.service.query(this.state);
        this.loading = true;
        this.view.subscribe(function (r) {
            _this.loading = false;
            debugger;
            _this.loaddata(r);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.query(this.state);
        this.loading = true;
        this.view.subscribe(function (r) {
            _this.loading = false;
            debugger;
            _this.loaddata(r);
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'my-app',
            template: "\n    {{ loading }}\n    <kendo-grid\n      [data]=\"gridData\"\n      [loading]=\"loading\"\n      [pageSize]=\"state.take\"\n      [skip]=\"state.skip\"\n      [sort]=\"state.sort\"\n      [filter]=\"state.filter\"\n      filterable=\"menu\"\n      [pageable]=\"{\n        buttonCount: buttonCount,\n        info: info,\n        type: type,\n        pageSizes: pageSizes,\n        previousNext: previousNext\n      }\"\n      [sortable]=\"true\"\n      (dataStateChange)=\"dataStateChange($event)\"\n    >\n      <kendo-grid-column field=\"id\" title=\"ID\" width=\"80\" [filterable]=\"false\"></kendo-grid-column>\n      <kendo-grid-column field=\"name\" title=\"Name\"></kendo-grid-column>\n      <kendo-grid-column field=\"number\" title=\"Number\"></kendo-grid-column>\n    </kendo-grid>\n  "
        }),
        __metadata("design:paramtypes", [DataService1])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map
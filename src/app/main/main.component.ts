import { Component, ViewChildren, AfterViewInit, QueryList,  OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FiltercomponentComponent} from '../filtercomponent/filtercomponent.component';
import {DefaultFilterService} from '../default-filter.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements AfterViewInit, OnInit {

  constructor(private http: HttpClient, private filter: DefaultFilterService) {}

  @ViewChildren(FiltercomponentComponent) Filtercomponent: QueryList<FiltercomponentComponent>;
  filterOptions = {
    limit: [10, 50, 100],
    languages: [ 'USD', 'AUD', 'BRL',
    'CAD', 'CHF', 'CLP', 'CNY',
    'CZK', 'DKK', 'EUR', 'GBP',
    'HKD', 'HUF', 'IDR', 'ILS',
    'INR', 'JPY', 'KRW', 'MXN',
    'MYR', 'NOK', 'NZD', 'PHP',
    'PKR', 'PLN', 'RUB', 'SEK',
    'SGD', 'THB', 'TRY', 'TWD',
    'ZAR']
  };
  defaultQuery = {
    defaultCurrenty: this.filter.DefaultQuery.defaultCurrenty || 'USD',
    defaultlimit: this.filter.DefaultQuery.defaultlimit || '10'
  };

  tableData;

  getCryto(query?) {
    const params = new HttpParams({
      fromObject: {
        convert: query.defaultCurrenty,
        limit: query.defaultlimit
      }
    });
     return this.http.get('https://api.coinmarketcap.com/v1/ticker/', {params: params});
  }

  ngOnInit() {
    this.getCryto(this.defaultQuery).subscribe(data => {
      this.tableData = data;
    });
  }
  ngAfterViewInit() {
    this.Filtercomponent.forEach((item, inx) => {
      item.filter.map((data) => {
      if (data) {
        switch (inx) {
          case 1:
            this.defaultQuery.defaultCurrenty = data;
            this.filter.DefaultQuery.defaultCurrenty = data;
            break;
          case 0:
            this.defaultQuery.defaultlimit = data;
            this.filter.DefaultQuery.defaultlimit = data;
            break;
        }
      }
      return Object.assign({}, this.defaultQuery);
      }).subscribe(crytoTable => {
        this.getCryto(crytoTable).subscribe(data => {
          const idk = [];
          for (let i = 0; i < data['length']; i ++) {
            idk.push({
              rank: data[i]['rank'],
              name: data[i]['name'],
              symbol: data[i]['symbol'],
              price_usd: data[i]['price_usd'],
              percent_change_24h: data[i]['percent_change_24h'],
              other_price :
              data[i]['price_' + this.defaultQuery.defaultCurrenty.toLowerCase()]
            });
          }
          this.tableData = idk;
        });
      });
        });
    }
  }

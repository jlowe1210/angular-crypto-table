import { Component,  ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as Highcharts from 'highcharts/highstock';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cryto-chart',
  templateUrl: './cryto-chart.component.html',
  styleUrls: ['./cryto-chart.component.css']
})
export class CrytoChartComponent implements  AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  @ViewChild('chartTarget') chartTarget;

  done = false;

  ngAfterViewInit() {
    this.route.queryParamMap.subscribe(data => {
      this.http.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${data['params'].symbol}&tsym=${data['params'].curr}&limit=1000`)
        .subscribe(charting => {
          if (charting['Response'] !== 'Success' ) {
            this.router.navigate(['/']);
          }
         const me = charting['Data'].reduce((acc, val) => {
            acc.push([val.time * 1000, val.close ]);
            return acc;
         }, []);
         Highcharts.stockChart(this.chartTarget.nativeElement, {
          rangeSelector: {
            selected: 1
        },
        title: {
            text: `${data['params'].symbol} History in ${data['params'].curr} Currency`
        },
        series: [{
            name: `${data['params'].symbol}`,
            data: me,
        }]
         });
         this.done = true;
        });
    });
  }
  }


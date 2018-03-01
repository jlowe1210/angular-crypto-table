import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FiltercomponentComponent } from './filtercomponent/filtercomponent.component';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { FilterPipe } from './filter.pipe';
import { CrytoChartComponent } from './cryto-chart/cryto-chart.component';
import { MainComponent } from './main/main.component';


import {DefaultFilterService} from './default-filter.service';

const ROUTES = [
  { path: 'crisis-center', component: MainComponent },
  { path: 'chart',      component: CrytoChartComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FiltercomponentComponent,
    CryptoTableComponent,
    FilterPipe,
    CrytoChartComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [FilterPipe, DefaultFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

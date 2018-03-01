import { Component, Input} from '@angular/core';
import {DefaultFilterService} from '../default-filter.service';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent  {

  @Input() tableData;
  @Input() otherPirce;
  DefaultFilter = this.filter.DefaultQuery.defaultIdk || 'ALL';

  constructor(private filter: DefaultFilterService) { }

  changeFilter(e) {
    this.DefaultFilter = e.target.value;
    this.filter.DefaultQuery.defaultIdk = e.target.value;
  }
}

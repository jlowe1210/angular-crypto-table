import { Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-filtercomponent',
  templateUrl: './filtercomponent.component.html',
  styleUrls: ['./filtercomponent.component.css']
})
export class FiltercomponentComponent implements OnInit {

  @Input() filterBy;
  @Input() filerOptions;
  filter = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit() {
  }

  idk(e) {
    this.filter.next(e.target.value);
  }

}

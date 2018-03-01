import { Injectable } from '@angular/core';

@Injectable()
export class DefaultFilterService {

  DefaultQuery = {
    defaultCurrenty: null,
    defaultlimit: null,
    defaultIdk: null
  };

  constructor() { }


  getQuery() {
    return this.DefaultQuery;
  }

}

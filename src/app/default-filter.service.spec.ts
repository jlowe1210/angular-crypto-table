import { TestBed, inject } from '@angular/core/testing';

import { DefaultFilterService } from './default-filter.service';

describe('DefaultFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultFilterService]
    });
  });

  it('should be created', inject([DefaultFilterService], (service: DefaultFilterService) => {
    expect(service).toBeTruthy();
  }));
});

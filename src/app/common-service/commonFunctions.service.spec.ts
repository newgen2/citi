import { TestBed, inject } from '@angular/core/testing';

import { CommonFunctions } from './commonFunctions.service';

describe('CommonFunctions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonFunctions]
    });
  });

  it('should be created', inject([CommonFunctions], (service: CommonFunctions) => {
    expect(service).toBeTruthy();
  }));
});

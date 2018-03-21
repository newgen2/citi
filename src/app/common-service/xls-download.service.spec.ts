import { TestBed, inject } from '@angular/core/testing';

import { XlsDownloadService } from './xls-download.service';

describe('XlsDownloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XlsDownloadService]
    });
  });

  it('should be created', inject([XlsDownloadService], (service: XlsDownloadService) => {
    expect(service).toBeTruthy();
  }));
});

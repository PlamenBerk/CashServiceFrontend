import { TestBed } from '@angular/core/testing';

import { SiteServiceService } from './site-service.service';

describe('SiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteServiceService = TestBed.get(SiteServiceService);
    expect(service).toBeTruthy();
  });
});

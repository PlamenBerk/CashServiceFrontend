import { TestBed } from '@angular/core/testing';

import { DeviceModelService } from './device-model.service';

describe('DeviceModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceModelService = TestBed.get(DeviceModelService);
    expect(service).toBeTruthy();
  });
});

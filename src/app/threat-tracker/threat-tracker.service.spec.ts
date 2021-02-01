import { TestBed } from '@angular/core/testing';

import { ThreatTrackerService } from './threat-tracker.service';

describe('ThreatTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreatTrackerService = TestBed.get(ThreatTrackerService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ImageZoomService } from './image-zoom.service';

describe('ImageZoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageZoomService = TestBed.get(ImageZoomService);
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { MarkTypeService } from './mark-type.service';

describe('MarkTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkTypeService]
    });
  });

  it('should be created', inject([MarkTypeService], (service: MarkTypeService) => {
    expect(service).toBeTruthy();
  }));
});

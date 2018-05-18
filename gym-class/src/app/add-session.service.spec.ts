import { TestBed, inject } from '@angular/core/testing';

import { AddSessionService } from './add-session.service';

describe('AddSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddSessionService]
    });
  });

  it('should be created', inject([AddSessionService], (service: AddSessionService) => {
    expect(service).toBeTruthy();
  }));
});

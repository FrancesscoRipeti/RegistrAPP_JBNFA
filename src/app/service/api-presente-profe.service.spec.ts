import { TestBed } from '@angular/core/testing';

import { ApiPresenteProfeService } from './api-presente-profe.service';

describe('ApiPresenteProfeService', () => {
  let service: ApiPresenteProfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPresenteProfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApplicationInterceptor } from './application.interceptor';

describe('ApplicationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApplicationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApplicationInterceptor = TestBed.inject(ApplicationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

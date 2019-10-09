import { TestBed, inject } from '@angular/core/testing';

import { WeatherLocator } from './weather.locator';

describe('WeatherLocator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherLocator]
    });
  });

  it('should be created', inject([WeatherLocator], (service: WeatherLocator) => {
    expect(service).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import { WeatherLocator } from './../locators/weather.locator'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private weatherLocator: WeatherLocator) { }

  getTemperature() {
    return this.weatherLocator.getWeather().pipe(map((data: any) => {   
    let list = data.list.slice(0, 5);
    return list.map((data, i) => {
        let kelvins = data.main.temp;
        return Math.round(kelvins - 273.15);
    })
    }));
  }
}

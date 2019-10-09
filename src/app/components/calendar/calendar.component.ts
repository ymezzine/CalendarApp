import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WeekDay } from '@angular/common';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  daysLabels: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthsLabels: Array<string> = [];
  years: Array<number> = [2017, 2018, 2019, 2020, 2021];

  monthData = [];
  dayData: DayData;

  daysInMonth: number;
  currentDay: any;

  selectedMonth: number;
  selectedYear: number;

  indexfirstDayOfMonth = 1;

  dataWeather = [];



  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    let today = moment();

    this.monthsLabels = moment.months();
    this.daysLabels = moment.weekdaysShort();

    this.selectedMonth = today.month();
    this.selectedYear = today.year();

    this.weatherService.getTemperature().subscribe(result => {
      this.dataWeather = result;
    },
    err => {
      console.log(err);
    })

    this.generateCalendar(today);

    console.log(this.monthData);
  }


  generateCalendar(date: any){

    let year = date.year();
    let month = date.month();

    let daysInMonth = date.daysInMonth();
    let weeks = Math.ceil(daysInMonth / 7);

    let firstDayOfMonth = date.clone().startOf('month');
    let indexfirstDayOfMonth = firstDayOfMonth.weekday();


    let day: number = 1;
    let counterDaysWeather: number = 0;
    for (let week = 0; week < weeks; week++) {
      if (!this.monthData[week]) {
        this.monthData[week] = [];
      }

      for (let i = 0; i < 7; i++) {
        if (!this.monthData[week][i]) {
          this.monthData[week][i] = null;
        }

        this.dayData = new DayData();
        this.dayData.day = day;
        this.dayData.weather = null;

        if (week == 0) {
          if (i >= indexfirstDayOfMonth - 1) {
          
            var currentDate = moment([year, month, day]).format("DDMMYYYY"); 
            this.dayData.isToday = this.isEqualToday(currentDate);

            if((this.dayData.isToday || counterDaysWeather > 0) && counterDaysWeather < 5){
              this.dayData.weather = this.dataWeather[counterDaysWeather];
              counterDaysWeather++;
            }
            
            this.monthData[week][i] =  this.dayData;
            day++;
          }
        }
        else {
          if (day <= daysInMonth) {

            var currentDate = moment([year, month, day]).format("DDMMYYYY"); 
            this.dayData.isToday = this.isEqualToday(currentDate);

            
            if((this.dayData.isToday || counterDaysWeather > 0) && counterDaysWeather < 5){
              console.log("dataWeather", counterDaysWeather, this.dataWeather[counterDaysWeather]);
              this.dayData.weather = this.dataWeather[counterDaysWeather];
              counterDaysWeather++;
            }
            
            this.monthData[week][i] =  this.dayData;
            day++;
          }
        }
      }
    }
  }

  isEqualToday(date: any){
    return moment().format('DDMMYYYY') == moment(date, 'DDMMYYYY').format('DDMMYYYY');
  }

  onChangeMonth(month){
    this.monthData = [];
    let date = moment([this.selectedYear, month, 1]);
    this.generateCalendar(date);
  }

  onChangeYear(year){
    this.monthData = [];
    let date = moment([year, this.selectedMonth, 1]);
    this.generateCalendar(date);
  }

}

export class DayData{
  day: number;
  isToday: boolean;
  weather: number;
}

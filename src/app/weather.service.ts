import { ISummary } from './models/summary';
import { IDayTile } from './models/dayTile';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';
import { Itpw } from './models/tpw';
import { ITemperature } from './models/temperature';

@Injectable()
export class WeatherService {
  summary: ISummary;
  tpw: Itpw;
  tempArray: Array<any>
  chartdetails: Array<any>;
  
  temperature: ITemperature;
  dayWiseMap: any;
  dayTileList: Array<IDayTile>;
  constructor(private httpService: Http) {
    this.dayWiseMap = {};
  }

  updateDayInfoFor(dayNum: number) {
    // Get the day
    // Lookup in the day wise map for the dayNum
    // Update summary
    const dayInfoForDay = this.dayWiseMap[dayNum];
    console.log("dayInfoForDay"+dayInfoForDay);
    this.summary = {
      ...this.summary,
      day: moment(dayInfoForDay[0].dt * 1000).format("dddd"),
      weatherCondition: dayInfoForDay[0].weather[0].description
    };
    const iconId = dayInfoForDay[0].weather[0].icon;
    const icon =  "http://openweathermap.org/img/w/" + iconId + ".png";
    this.temperature= {
    
      temperatureInCelcius: Math.ceil((dayInfoForDay[0].main.temp)-273),
          temperatureInFahrenheit: Math.ceil((((dayInfoForDay[0].main.temp)-273)*9/5)+32),
          currentWeatherImageURL: icon

    };
    
  }
  

  fetchWeatherInfo(cityName: string) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=27d43832d2a4adcb97fcbfa23db130aa`;
    this.httpService.get(url)
      .subscribe((rsp) => {
        console.log(rsp.json());
        const data = rsp.json();
        this.summary = {
          cityName: data.city.name,
          day: moment(data.list[0].dt * 1000).format("dddd"),
          weatherCondition: data.list[0].weather[0].description
        };
        this.chartdetails=[];
      this.dayWiseMap.forEach(element => {
        
      this.tempArray.push(Math.round(element.main.temp-270));
      this.tempArray.push(moment(element.dt * 1000).format('dddd, h:mm a'));
      this.chartdetails.push(this.tempArray);
      this.tempArray = [];
        this.tpw = {
          temperature: _.round((parseFloat(data.list[0].main.temp)-270),2),
          pressure: parseInt(data.list[0].main.pressure),
          humidity: parseInt(data.list[0].main.humidity)
          

        };
        const iconId = data.list[0].weather[0].icon;
        const icon =  "http://openweathermap.org/img/w/" + iconId + ".png";
        this.temperature ={

          currentWeatherImageURL: icon,
           temperatureInCelcius: Math.ceil((data.list[0].main.temp)-273),
          // temperatureInCelcius:_.round((data.list[0].main.temp)-273, 2),
          temperatureInFahrenheit: Math.ceil((((data.list[0].main.temp)-273)*9/5)+32)
        }
        console.log("TPW"+this.tpw.pressure);
        // Build day wise map
        data.list.forEach(date => {
          // console.log(date);
          const dateValue = new Date(date.dt * 1000);
          const dayNum = dateValue.getDay();
          if (dayNum in this.dayWiseMap) {
            this.dayWiseMap[dayNum].push(date);
          } else {
            this.dayWiseMap[dayNum] = [date];
          }
        });
        console.log(this.dayWiseMap);

        const sortedMap = _.sortBy(this.dayWiseMap, (value) => {
          let dayOfWeek = new Date(value[0].dt * 1000).getDay();
          let today = new Date().getDay();
          const diff = dayOfWeek - today;
          return diff < 0 ? diff + 7 : diff;
        });

        console.log("This is sorted map"+sortedMap);

        this.dayTileList = _.map(sortedMap, (obj) => {
          const minTemp = _.reduce(obj.map(interval => interval.main.temp_min), (a, b) => a + b) / obj.length;
          const maxTemp = _.reduce(obj.map(interval => interval.main.temp_max), (a, b) => a + b) / obj.length;

       // const  iconId = obj.map(interval => interval.weather[0].icon);
       const iconId = obj[0].weather[0].icon;
        const icon =  "http://openweathermap.org/img/w/" + iconId + ".png";
          return {
            day: moment(obj[0].dt * 1000).format("ddd"),
            minTemp: _.round(minTemp - 270, 2),
            maxTemp: _.round(maxTemp- 270, 2),        
                    
            imageURL: icon,
            dayNum: new Date(obj[0].dt * 1000).getDay()
          }
        });
        console.log(this.dayTileList);
      });
      
      });
      console.log("chardata"+this.chartdetails);
        //   this.dayWiseMap[day].forEach(element => {
    //    this.templist.push(Math.round(element.main.temp-270));
    //    this.datelist.push(moment(element.dt * 1000).format('dddd, h:mm a'));
    //    // console.log(this.templist);
    // Build data structure for the tiles
    // updateGraphDetails(day){
  
    //   this.datelist=[];
    //   this.templist=[];
    //   this.dayWiseMap[day].forEach(element => {
    //    this.templist.push(Math.round(element.main.temp-270));
    //    this.datelist.push(moment(element.dt * 1000).format('dddd, h:mm a'));
    //    // console.log(this.templist);
    //   });
    //}
  }

}

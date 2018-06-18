import { Component, OnInit, Input, OnChanges } from '@angular/core';
//import { Chart } from 'ng2-google-charts';
//import { Chart } from 'angular-highcharts/public_api';
//import { Chart } from 'angular-highcharts';
//import { Chart } from 'angular-highcharts/chart';
//import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent  {
    @Input() chartData;
    pieChartData =  {
      chartType: 'LineChart',
      // dataTable: [
      //   ['Task', 'Hours per Day'],
      //   ['Work',     11],
      //   ['Eat',      2],
      //   ['Commute',  2],
      //   ['Watch TV', 2],
      //   ['Sleep',    7]
      // ],
      dataTable: this.chartData,
      options: {'title': 'Tasks'},
    };
  }
  


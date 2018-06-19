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
export class GraphComponent implements OnChanges {
  @Input() chartData;
  pieChartData: any;
  // pieChartData = {
  //   chartType: 'LineChart',
  //   dataTable: [
  //     ['Task', 'Hours per Day'],
  //     ['Work', 11],
  //     ['Eat', 2],
  //     ['Commute', 2],
  //     ['Watch TV', 2],
  //     ['Sleep', 7]
  //   ]

    // public line_ChartData = [
    //   ['Year', 'Sales', 'Expenses'],
    //   ['2004', 1000, 400],
    //   ['2005', 1170, 460],
    //   ['2006', 660, 1120],
    //   ['2007', 1030, 540]];


    //dataTable: this.chartData,
    //options: {'title': 'Tasks'},
    //};
  // }

  ngOnChanges() {
    console.log(this.chartData);
    this.pieChartData = {
      chartType: 'LineChart',
      dataTable: [['Time', 'Temperature'],...this.chartData]
    }
  }
}

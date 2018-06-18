import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartHTMLTooltip } from 'ng2-google-charts';
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
  chart;
  ngOnChanges(){
    
  //     this.chart = new Chart({
  //       chart: {
  //         type: 'line'
  //       },
  //       title: {
  //         text: 'Linechart'
  //       },
  //       credits: {
  //         enabled: false
  //       },
  //       series: [
  //         {
  //           name: 'Line 1',
  //           data: [1, 2, 3]
  //         }
  //       ]
  //     });
  // }
  }
}

import { THEME_COLORS } from './../../shared/theme.colors';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;
  @Input() limit: any;

  pieChartData: number[] ; // = [350, 450, 120];
  colors: any[] = [
    {
      // backgroundColor: ['#26547c', '#ff6b6b', '#ffd166'],
      // borderColor: '#111'

      backgroundColor: this.themeColors(theme),
      borderColor: '#111'
    }
  ];
  pieChartLabels: string[] ; // = ['XYZ Logistics', 'Main St Bakery', 'Acme Hosting'];
  pieChartType = 'doughnut';

  ngOnInit() {
    this.parseChartData(this.inputData, this.limit);
  }

  parseChartData(res: any, limit?: number) {
    console.log('response: ', res);

    const allData = res.slice(0, limit);
    console.log('allData (slice): ', allData);

    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;
    return c;
  }
}

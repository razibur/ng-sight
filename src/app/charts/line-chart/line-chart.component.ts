import { Customer } from './../../shared/Customer';
import { SalesDataService } from './../../services/sales-data.service';
import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import * as moment from 'moment';

// const LINE_CHART_SAMPLE_DATA: any[] = [
//   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
//   { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
//   { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'}
// ];

// const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' ];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _saleDataService: SalesDataService) { }

  topCustomers: string[];
  allOrders: any[];

  lineChartData: any ; // = LINE_CHART_SAMPLE_DATA;
  lineChartLabels: any ; // = LINE_CHART_LABELS;
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartColors = LINE_CHART_COLORS;
  lineChartType = 'line';

  ngOnInit() {
    this._saleDataService.getOrders(1, 100)
      .subscribe( res => {
        // console.log('getOrders:', res);

        this.allOrders = res['page']['data'];
        // console.log('allOrders: ', this.allOrders);

        this._saleDataService.getOrdersByCustomer(3)
          .subscribe(cus => {
            // console.log('cus: ', cus);

            this.topCustomers = cus.map(x => x['name']);
            // console.log('topCustomers: ', this.topCustomers);

            const allChartData = this.topCustomers.reduce((result, i) => {
              result.push(this.getChartData(this.allOrders, i));
              return result;
            }, []);
            // console.log('allChartData: ', allChartData);

            let dates = allChartData.map(x => x['data']).reduce((a, i) => {
              a.push(i.map(o => new Date(o[0])));
              return a;
            }, []);
            // console.log('dates: ', dates);

            dates = [].concat.apply([], dates);
            // console.log('dates: ', dates);

            const r = this.getCustomerOrderByDate(allChartData, dates)['data'];
            console.log('r:', r);

            this.lineChartLabels = r[0]['orders'].map(o => o['date']);
            this.lineChartData = [
              { data: r[0]['orders'].map(x => x['total']), label: r[0]['customer']},
              { data: r[1]['orders'].map(x => x['total']), label: r[1]['customer']},
              { data: r[2]['orders'].map(x => x['total']), label: r[2]['customer']}
            ];
          });
      });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(o => o.customer.name === name);
    // console.log('name:', name, 'customersorders', customerOrders);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);
    // console.log('formattedOrders: ', formattedOrders);

    const result = { customer: name, data: formattedOrders};
    // console.log('result: ', result);

    return result;
  }

  getCustomerOrderByDate(orders: any, dates: any) {
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    // console.log('prettyDates: ', prettyDates);

    const u = Array.from(new Set(prettyDates)).sort();
    // console.log('UniqueDate: ', u);

    const result = {};
    const dataSets = result['data'] = [];

    customers.reduce((x, y, i) => {
      // console.log('Reducing:', y, 'at index:', i);
      const customerOrders = [];

      dataSets[i] = {
        customer: y,
        orders: u.reduce((r, e, j) => {
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y);
          customerOrders.push(obj);
          // console.log('Reducing:', e, 'at index:', j, 'customerOrders', customerOrders);
          return customerOrders;
        })
      };

      return x;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }
}

import { HttpModule } from '@angular/http';

import { SalesDataService } from './services/sales-data.service';
import { appRoutes } from './../route';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from './sections/section-orders/section-orders.component';
import { SectionHealthComponent } from './sections/section-health/section-health.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ServerComponent } from './server/server.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionSalesComponent,
    SectionOrdersComponent,
    SectionHealthComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ServerComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SalesDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

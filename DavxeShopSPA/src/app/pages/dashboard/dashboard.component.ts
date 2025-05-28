import { Component, ViewChild } from '@angular/core';
import { Chart, ChartType, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartType: 'bar' = 'bar';

  selectedSection: string = '';

  selectSection(section: string) {
    this.selectedSection = section;
  }
  
  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Usuarios nuevos',
        data: [30, 50, 70, 40, 90, 120],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Ventas',
        data: [20, 40, 60, 30, 80, 100],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };

  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Dashboard - Usuarios y Ventas por mes'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor() {
    Chart.register(...registerables);
  }
}

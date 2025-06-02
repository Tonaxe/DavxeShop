import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartType, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../services/api.service';
import { ResponseDashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartType: 'bar' = 'bar';
  selectedSection: string = 'usuarios';

  userData = {
    total: 0,
    totalTrend: 0,
    new: 0,
    newTrend: 0,
    active: 0,
    activeTrend: 0,
    cities: 0,
    citiesTrend: 0
  };

  productData = {
    total: 356,
    topSelling: 24,
    recent: 18,
    categories: 8
  };

  salesData = {
    monthly: 12500,
    total: 35600,
    income: 89200,
    average: 125
  };

  chatData = {
    messages: 2456,
    conversations: 84,
    responses: 892,
    recent: 15
  };

  trendsData = {
    categories: 12,
    growth: 24,
    topBuyers: 8,
    topSellers: 5
  };

  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: 'Actividad Mensual',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 12 }
        }
      },
      x: {
        ticks: {
          font: { size: 12 }
        }
      }
    }
  };

  constructor(private apiService: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadUserStats();
  }

  selectSection(section: string) {
    this.selectedSection = section;
    if (section === 'usuarios') {
      this.loadUserStats();
    } else {
      this.updateChart();
    }
  }

  loadUserStats(): void {
    this.apiService.getUsersData().subscribe((res: ResponseDashboard) => {
      const data = res.datos;

      this.userData = {
        total: data.totalUsers,
        totalTrend: data.totalUsersTrend,
        new: data.newUsers,
        newTrend: data.newUsersTrend,
        active: data.activeUsers,
        activeTrend: data.activeUsersTrend,
        cities: data.usersByCity ? Object.keys(data.usersByCity).length : 0,
        citiesTrend: 0
      };

      this.chartData = {
        labels: data.weeklyActivity?.labels ?? [],
        datasets: [
          {
            label: 'Usuarios activos por semana',
            data: data.weeklyActivity?.data ?? [],
            backgroundColor: 'rgba(67, 97, 238, 0.7)',
            borderColor: 'rgba(67, 97, 238, 1)',
            borderWidth: 1,
          }
        ]
      };

      this.chart?.update();
    });
  }

  updateChart() {
    switch (this.selectedSection) {
      case 'productos':
        this.chartData = {
          labels: ['Electrónica', 'Ropa', 'Hogar'],
          datasets: [
            {
              label: 'Productos por categoría',
              data: [120, 90, 60],
              backgroundColor: 'rgba(76, 201, 240, 0.7)'
            }
          ]
        };
        break;

      case 'ventas':
        this.chartData = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
          datasets: [
            {
              label: 'Ingresos mensuales',
              data: [10000, 12500, 14000, 15500],
              backgroundColor: 'rgba(46, 204, 113, 0.7)'
            }
          ]
        };
        break;

      case 'chat':
        this.chartData = {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
          datasets: [
            {
              label: 'Mensajes diarios',
              data: [300, 400, 350, 500, 450],
              backgroundColor: 'rgba(243, 156, 18, 0.7)'
            }
          ]
        };
        break;

      case 'tendencias':
        this.chartData = {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: 'Crecimiento por trimestre (%)',
              data: [12, 18, 25, 30],
              backgroundColor: 'rgba(155, 89, 182, 0.7)'
            }
          ]
        };
        break;
    }

    this.chart?.update();
  }

  getSectionTitle(): string {
    switch (this.selectedSection) {
      case 'usuarios': return 'Gestión de Usuarios';
      case 'productos': return 'Inventario de Productos';
      case 'ventas': return 'Resumen de Ventas';
      case 'chat': return 'Mensajes y Soporte';
      case 'tendencias': return 'Tendencias del Mercado';
      default: return 'Dashboard';
    }
  }
}

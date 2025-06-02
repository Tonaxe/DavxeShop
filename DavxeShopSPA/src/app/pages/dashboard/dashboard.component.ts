import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartType, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../services/api.service';
import { DatosChat, ResponseDashboard, ResumenChatResponse, ResumenVentasResponse, SemanaActividad, VentaSemanal } from '../../models/dashboard.model';
import { Router } from '@angular/router';

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
  redirectToLogin() {
  // Opción 1: Usando Router de Angular
  this.router.navigate(['/login']);
}
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
    total: 0,
    totalTrend: 0,
    topSelling: 0,
    topSellingTrend: 0,
    recent: 0,
    recentTrend: 0,
    categories: 0,
    categoriesTrend: 0
  };

  ventasData = {
    ventasMensuales: 0,
    ventasMensualesTrend: 0,
    ventasTotales: 0,
    ventasTotalesTrend: 0,
    ingresos: 0,
    ingresosTrend: 0,
    promedioPorVenta: 0,
    promedioPorVentaTrend: 0,
    ventasSemanales: [] as VentaSemanal[]
  };

  chatData: DatosChat = {
    totalMessages: 0,
    totalMessagesTrend: 0,
    totalConversations: 0,
    totalConversationsTrend: 0,
    totalResponses: 0,
    totalResponsesTrend: 0,
    recentChats: 0,
    recentChatsTrend: 0,
    weeklyActivity: []
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

  constructor(private apiService: ApiService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadUserStats();
  }

  selectSection(section: string) {
    this.selectedSection = section;
    if (section === 'usuarios') {
      this.loadUserStats();
    } else if (section === 'productos') {
      this.loadProductStats();
    } else if (section === 'ventas') {
      this.loadVentasData();
    } else if (section === 'chat') {
      this.loadChatData();
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

  loadProductStats(): void {
    this.apiService.getProductsData().subscribe(res => {
      const data = res.datos;
      console.log('Datos recibidos:', data);

      this.productData = {
        total: data.total,
        totalTrend: data.totalTrend,
        topSelling: data.topSelling,
        topSellingTrend: data.topSellingTrend,
        recent: data.recent,
        recentTrend: data.recentTrend,
        categories: data.categories,
        categoriesTrend: data.categoriesTrend
      };

      if (data.weeklyActivity) {
        this.chartData = {
          labels: data.weeklyActivity.labels,
          datasets: [
            {
              label: 'Actividad semanal',
              data: data.weeklyActivity.data,
              backgroundColor: 'rgba(76, 201, 240, 0.7)'
            }
          ]
        };
        this.chart?.update();
      } else {
        this.chartData = { labels: [], datasets: [] };
        this.chart?.update();
      }
    });
  }

  loadVentasData(): void {
    this.apiService.getVentasData().subscribe((res: ResumenVentasResponse) => {
      const d = res.datos;
      this.ventasData = {
        ventasMensuales: d.ventasMensuales,
        ventasMensualesTrend: d.ventasMensualesTrend,
        ventasTotales: d.ventasTotales,
        ventasTotalesTrend: d.ventasTotalesTrend,
        ingresos: d.ingresos,
        ingresosTrend: d.ingresosTrend,
        promedioPorVenta: d.promedioPorVenta,
        promedioPorVentaTrend: d.promedioPorVentaTrend,
        ventasSemanales: d.ventasSemanales
      };

      this.chartData = {
        labels: this.ventasData.ventasSemanales.map(v => v.semana),
        datasets: [
          {
            label: 'Ingresos por semana',
            data: this.ventasData.ventasSemanales.map(v => v.totalDinero),
            backgroundColor: 'rgba(46, 204, 113, 0.7)'
          }
        ]
      };

      this.chart?.update();
    });
  }

  loadChatData(): void {
    this.apiService.getChatData().subscribe((res: ResumenChatResponse) => {
      this.chatData = res.datos;
      const labels = this.chatData.weeklyActivity.map((item: SemanaActividad) => item.semana);
      const data = this.chatData.weeklyActivity.map((item: SemanaActividad) => item.totalMensajes);

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Mensajes por semana',
            data: data,
            backgroundColor: 'rgba(243, 156, 18, 0.7)',
            borderColor: 'rgba(243, 156, 18, 1)',
            borderWidth: 1
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
    }

    this.chart?.update();
  }

  getSectionTitle(): string {
    switch (this.selectedSection) {
      case 'usuarios': return 'Gestión de Usuarios';
      case 'productos': return 'Inventario de Productos';
      case 'ventas': return 'Resumen de Ventas';
      case 'chat': return 'Mensajes y Soporte';
      default: return 'Dashboard';
    }
  }
}

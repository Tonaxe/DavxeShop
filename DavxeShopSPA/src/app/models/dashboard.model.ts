export interface WeeklyActivity {
  labels: string[];
  data: number[];
}

export interface UsuarioDashboard {
  totalUsers: number;
  totalUsersTrend: number;
  newUsers: number;
  newUsersTrend: number;
  activeUsers: number;
  activeUsersTrend: number;
  usersByCity: Record<string, number>;
  usersByCityTrend: Record<string, number>;
  weeklyActivity: WeeklyActivity;
}

export interface ResponseDashboard {
  datos: UsuarioDashboard;
}

export interface ProductDashboardResponse {
  datos: ProductDashboardData;
}

export interface ProductDashboardData {
  total: number;
  totalTrend: number;
  topSelling: number;
  topSellingTrend: number;
  recent: number;
  recentTrend: number;
  categories: number;
  categoriesTrend: number;
  weeklyActivity: WeeklyActivity;
}

export interface VentaSemanal {
  semana: string;
  totalDinero: number;
}

export interface ResumenVentasResponse {
  datos: VentasDashboardData
}


export interface VentasDashboardData {
  ventasMensuales: number;
    ventasMensualesTrend: number;
    ventasTotales: number;
    ventasTotalesTrend: number;
    ingresos: number;
    ingresosTrend: number;
    promedioPorVenta: number;
    promedioPorVentaTrend: number;
    ventasSemanales: VentaSemanal[];
}

export interface SemanaActividad {
  semana: string;
  totalMensajes: number;
}

export interface DatosChat {
  totalMessages: number;
  totalMessagesTrend: number;
  totalConversations: number;
  totalConversationsTrend: number;
  totalResponses: number;
  totalResponsesTrend: number;
  recentChats: number;
  recentChatsTrend: number;
  weeklyActivity: SemanaActividad[];
}

export interface ResumenChatResponse {
  datos: DatosChat;
}

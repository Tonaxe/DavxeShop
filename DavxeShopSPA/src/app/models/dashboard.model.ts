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

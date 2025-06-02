namespace DavxeShop.Models.models
{
    public class DashboardUsuariosDto
    {
        public int TotalUsers { get; set; }
        public int TotalUsersTrend { get; set; }

        public int NewUsers { get; set; }
        public int NewUsersTrend { get; set; }

        public int ActiveUsers { get; set; }
        public int ActiveUsersTrend { get; set; }

        public Dictionary<string, int> UsersByCity { get; set; }
        public Dictionary<string, int> UsersByCityTrend { get; set; }

        public WeeklyActivityDto WeeklyActivity { get; set; }
    }
}

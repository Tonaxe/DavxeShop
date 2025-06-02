namespace DavxeShop.Models.models
{
    public class ProductDashboardDto
    {
        public int Total { get; set; }
        public int TotalTrend { get; set; }

        public int TopSelling { get; set; }
        public int TopSellingTrend { get; set; }

        public int Recent { get; set; }
        public int RecentTrend { get; set; }

        public int Categories { get; set; }
        public int CategoriesTrend { get; set; }

        public WeeklyActivityDto WeeklyActivity { get; set; }
    }
}

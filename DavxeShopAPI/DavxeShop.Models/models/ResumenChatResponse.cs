namespace DavxeShop.Models.models
{
    public class ResumenChatResponse
    {
        public int TotalMessages { get; set; }
        public double TotalMessagesTrend { get; set; }

        public int TotalConversations { get; set; }
        public double TotalConversationsTrend { get; set; }

        public int TotalResponses { get; set; }
        public double TotalResponsesTrend { get; set; }

        public int RecentChats { get; set; }
        public double RecentChatsTrend { get; set; }

        public List<SemanaActividad> WeeklyActivity { get; set; } = new();
    }
}

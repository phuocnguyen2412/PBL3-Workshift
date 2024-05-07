namespace PBL3.Server.Models
{
    public class BonusSalaryModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int TotalBonus { get; set; }
        public string? Reason { get; set; }
    }
}

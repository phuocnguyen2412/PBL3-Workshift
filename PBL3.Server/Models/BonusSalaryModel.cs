namespace PBL3.Server.Models
{
    public class BonusSalaryModel
    {
        public int EmployeeId { get; set; }
        public DateTime DateTime {  get; set; }
        public int TotalBonus { get; set; }
        public string? Reason { get; set; }
    }
}

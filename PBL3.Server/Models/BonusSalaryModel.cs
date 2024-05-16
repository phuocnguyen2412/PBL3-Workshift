namespace PBL3.Server.Models
{
    public class BonusSalaryModel
    {
        public List<int> EmployeeIds { get; set; }
        public DateTime Date {  get; set; }
        public int Bonus { get; set; }
        public string Reason { get; set; }
    }
}

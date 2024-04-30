using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class EmployeeSummaryModel
{
    public int Id { get; set; }
    public string? FullName { get; set; }
    public bool? TypeOfEmployee { get; set; }
    public bool? Status { get; set; }
    public string DutyName { get; set; }
}


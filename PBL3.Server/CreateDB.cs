using PBL3.Server.Modals;
using System.Data.Entity;
namespace PBL3.Server
{
    public class CreateDB : DropCreateDatabaseIfModelChanges<MyDbContext>
    {
        protected override void Seed(MyDbContext context)
        {
            context.Duties.AddRange(new Duty[] {});
            context.Employees.AddRange(new Employee[] { });

        }
    }
}

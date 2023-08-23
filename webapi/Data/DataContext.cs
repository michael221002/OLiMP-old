using Microsoft.EntityFrameworkCore;
using webapi.models;

namespace webapi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //Tables
        public DbSet<tableShema> CurrentState => Set<tableShema>();
        public DbSet<EmployeeChange> EmployeeChanges => Set<EmployeeChange>();
        public DbSet<departementsModel> Departements => Set<departementsModel>();
    }
}

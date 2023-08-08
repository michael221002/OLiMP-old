using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class initialcurrentstatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "SuperHeroes",
                newName: "Id");

            migrationBuilder.CreateTable(
                name: "CurrentState",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    employeenumber = table.Column<int>(type: "int", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_principal_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    azure_ad_object_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    legacy_email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    middle_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    known_as = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    profitcenter = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    region_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    worker_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    office_location_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    manager_employee_number = table.Column<int>(type: "int", nullable: false),
                    is_employed = table.Column<int>(type: "int", nullable: false),
                    termination_date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    last_date_worked_utc = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentState", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentState");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SuperHeroes",
                newName: "id");
        }
    }
}

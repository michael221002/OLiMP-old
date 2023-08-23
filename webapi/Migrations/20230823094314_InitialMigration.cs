using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CurrentState",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    employeenumber = table.Column<int>(type: "int", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_principal_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    azure_ad_object_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    legacy_email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    middle_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    known_as = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    profitcenter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    region_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    worker_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    office_location_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    manager_employee_number = table.Column<int>(type: "int", nullable: true),
                    is_employed = table.Column<int>(type: "int", nullable: false),
                    termination_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    last_date_worked_utc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentState", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    department = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeChanges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeNumber = table.Column<int>(type: "int", nullable: false),
                    KeyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OldKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChangeDate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeChanges", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentState");

            migrationBuilder.DropTable(
                name: "Departements");

            migrationBuilder.DropTable(
                name: "EmployeeChanges");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class Clear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tableShema",
                table: "tableShema");

            migrationBuilder.RenameTable(
                name: "tableShema",
                newName: "CurrentState");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentState",
                table: "CurrentState",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentState",
                table: "CurrentState");

            migrationBuilder.RenameTable(
                name: "CurrentState",
                newName: "tableShema");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tableShema",
                table: "tableShema",
                column: "Id");
        }
    }
}

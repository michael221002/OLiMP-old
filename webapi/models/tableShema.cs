namespace webapi.models
{
    public class tableShema
    {
        public int Id { get; set; }
        public int employeenumber { get; set; }
        public string? email { get; set; }
        public string? user_principal_name { get; set; }
        public string? azure_ad_object_id { get; set; }
        public string? legacy_email { get; set; }
        public string? firstname { get; set; }
        public string? lastname { get; set; }
        public string? middle_name { get; set; }
        public string? known_as { get; set; }
        public string? department { get; set; }
        public string? profitcenter { get; set; }
        public string? region_code { get; set; }
        public string? worker_type { get; set; }
        public string? office_location_code { get; set; }
        public int? manager_employee_number { get; set; }
        public int is_employed { get; set; }
        public string? termination_date { get; set; }
        public string? last_date_worked_utc { get; set; }
    }
}

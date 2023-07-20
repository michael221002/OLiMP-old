export interface tableScema { 
    employeenumber: number; 
    email?: string; 
    user_principal_name?: string; 
    azure_ad_object_id: string; 
    legacy_email: string;  
    firstname: string;  
    lastname: string;  
    middle_name: string;  
    known_as: string;  
    department: string;  
    profitcenter: string;  
    region_code: string;  
    worker_type: string;  
    office_location_code: string;  
    manager_employee_number?: number;
    is_employed: number; 
    termination_date?: string;  
    last_date_worked_utc?: string;  
}
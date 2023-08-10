import { MatTableDataSource } from "@angular/material/table";

export interface ImportModel {
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    filteredDataSource: MatTableDataSource<any>;
    dataLoading: boolean;
    selectedFile: File | null;
    showSettingXScale: string;
    layout: string;
    searchValue: string[];
    filterValue: string[];
    filterElements: string[];
    filteredCategory: string;
}
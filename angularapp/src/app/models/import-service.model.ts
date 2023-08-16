import { tableScema } from "./table-Scema.model";

export interface ImportServiceModel {
  jsonData: tableScema[];
  displayedColumns: string[];
  searchValue: string[];
  filterValue: string[];
  filteredCategory: string;
  fileName: string; // Neue Eigenschaft für den Dateinamen
}
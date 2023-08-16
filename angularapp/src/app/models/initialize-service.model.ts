import { tableScema } from "./table-Scema.model";

export interface InitializeFiles {
    jsonData: tableScema[];
    displayedColumns: string[];
    fileName: string;
    fileDate: Date; // Hinzugefügt
}
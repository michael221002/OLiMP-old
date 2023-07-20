import { tableScema } from "./tableScema";

export interface InitializeFiles {
    jsonData: tableScema[];
    displayedColumns: string[];
    fileName: string;
}
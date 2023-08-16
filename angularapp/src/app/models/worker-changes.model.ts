import { changedData } from "./data-change.model";
import { tableScema } from "./table-Scema.model";

export class preChanges {
    employee: tableScema;
    changedData: changedData[];

    constructor(employee: tableScema, changedData: changedData[]) {
        this.employee = employee;
        this.changedData = changedData;
    }
}
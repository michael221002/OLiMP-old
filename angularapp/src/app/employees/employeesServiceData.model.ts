export interface nameList {
    employeeId: number;
    firstName: string;
    lastName: string;
    guid: number;
}

export class employeesServiceData {
    nameList: nameList[];
    searchValue: string[];
    filteredNameList: nameList[];

    constructor(nameList?: nameList[], searchValue?: string[], filteredNameList?: nameList[]) {
        this.nameList = nameList = [];
        this.searchValue = searchValue = [];
        this.filteredNameList = filteredNameList = [];
    }
}
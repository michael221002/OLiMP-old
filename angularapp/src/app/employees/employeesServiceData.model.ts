export interface nameList {
    employeeId: number;
    firstname: string;
    lastname: string;
    GUID: number;
}

export class employeesServiceData {
    nameList?: nameList[];
    searchValue?: string;

    constructor(nameList?: nameList[], searchValue?: string) {
        this.nameList = nameList;
        this.searchValue = searchValue;
    }
}
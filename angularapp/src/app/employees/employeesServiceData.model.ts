export interface nameList {
    employeeId: number;
    firstName: string;
    lastName: string;
    guid: number;
}

export class employeesServiceData {
    nameList?: nameList[];
    searchValue?: string;

    constructor(nameList?: nameList[], searchValue?: string) {
        this.nameList = nameList;
        this.searchValue = searchValue;
    }
}
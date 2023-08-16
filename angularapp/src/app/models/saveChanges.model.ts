export class saveChange {
    employeeNumber: number;
    keyName: string;
    oldKey: string;
    newKey: string;
    changeDate: string;

    constructor(employeeNumber: number, keyName: string, oldKey: string, newKey: string, changeDate: string) {
        this.employeeNumber = employeeNumber ;
        this.keyName = keyName;
        this.oldKey = oldKey;
        this.newKey = newKey;
        this.changeDate = changeDate;
    }
  }
  
/// <reference lib="webworker" />

import * as XLSX from 'xlsx';

addEventListener('message', ({ data }) => {
  const file = data.file;
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const worksheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    // Konvertiere die Werte von employeenumber, manager_employee_number und is_employed in Nummern
    for (const data of jsonData) {
      data.employeenumber = Number(data.employeenumber);
      data.manager_employee_number = Number(data.manager_employee_number);
      data.is_employed = Number(data.is_employed);
    }

    const result = { jsonData, displayedColumns: jsonData.length > 0 ? Object.keys(jsonData[0]) : [] };
    postMessage(result);
  };
  reader.readAsBinaryString(file);
});
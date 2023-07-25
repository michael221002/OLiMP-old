/// <reference lib="webworker" />

import { tableScema } from "../models/tableScema";

addEventListener('message', ({ data }) => {
  const files = data.files;
  const changes = [];
  
  function change(firstOne: tableScema, secOne: tableScema) {
    const keys = Object.keys(firstOne);
    for (const key of keys) {
      if (firstOne[key] !== secOne[key]) {
        return true;
      }
    }
    return false;
  }
  
  for (let file = 0; file < files.length - 1; file++) {
    for (let employee = 0; employee < files[file].jsonData.length; employee++) {
      const currentEmployee = files[file].jsonData[employee];
      const nextFileData = files[file + 1].jsonData;
      const matchedEmployee = nextFileData.find(
        (secondEmployee: tableScema) => currentEmployee.employeenumber === secondEmployee.employeenumber
      );
  
      if (matchedEmployee && change(currentEmployee, matchedEmployee)) {
        changes.push([currentEmployee, matchedEmployee]);
        postMessage({ type: 'log', message: "Employee found: " + currentEmployee.user_principal_name });
      }
    }
  }
  
  postMessage({ type: 'result', changes: changes });
});
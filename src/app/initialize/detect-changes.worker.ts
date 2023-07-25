/// <reference lib="webworker" />

import { tableScema } from "../models/tableScema";

addEventListener('message', ({ data }) => {
  const files = data.files;
  const changes = [];
  
  function hasChanged(firstOne: tableScema, secOne: tableScema) {
    const keys = Object.keys(firstOne);
    for (const key of keys) {
      if (firstOne[key] !== secOne[key]) {
        return true;
      }
    }
    return false;
  }

  function changeMessage(current: tableScema, next: tableScema) {
    const changeMessages = [];
    const keys = Object.keys(current);
    for (const key of keys) {
      if (current[key] !== next[key]) {
        changeMessages.push(`${key} changed from "${current[key]}" to "${next[key]}"`);
      }
    }
    return changeMessages.join(", ");
  }
  
  for (let file = 0; file < files.length - 1; file++) {
    for (let employee = 0; employee < files[file].jsonData.length; employee++) {
      const currentEmployee = files[file].jsonData[employee];
      const nextFileData = files[file + 1].jsonData;
      const matchedEmployee = nextFileData.find(
        (secondEmployee: tableScema) => currentEmployee.employeenumber === secondEmployee.employeenumber
      );
  
      if (matchedEmployee && hasChanged(currentEmployee, matchedEmployee)) {
        const changeMessageStr = changeMessage(currentEmployee, matchedEmployee);
        changes.push([currentEmployee, changeMessageStr]);
        postMessage({ type: 'log', message: `${currentEmployee.user_principal_name}: ${changeMessageStr}` });
      }
    }
  }
  
  postMessage({ type: 'result', changes: changes });
});
/// <reference lib="webworker" />

import { changedData } from "../models/data-change.model";
import { tableScema } from "../models/tableScema";

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
  const changeData = [];
  const keys = Object.keys(current);
  for (const key of keys) {
    if (current[key] !== next[key]) {
      const value: changedData = { keyName: key, oldKey: current[key], newKey: next[key] };
      changeData.push(value);
    }
  }
  return changeData;
}

addEventListener('message', ({ data }) => {
  const files = data.files;
  const changes = [];

  for (let file = 0; file < files.length - 1; file++) {
    for (let employee = 0; employee < files[file].jsonData.length; employee++) {
      const currentEmployee = files[file].jsonData[employee];
      const nextFileData = files[file + 1].jsonData;
      const matchedEmployee = nextFileData.find(
        (secondEmployee: tableScema) => currentEmployee.employeenumber === secondEmployee.employeenumber
      );

      if (matchedEmployee && hasChanged(currentEmployee, matchedEmployee)) {
        const changeData = changeMessage(currentEmployee, matchedEmployee);
        changes.push([currentEmployee, changeData]);

        // Hier senden wir die Log-Nachrichten an den Hauptthread. with log
        postMessage({ type: 'log', message: `${currentEmployee.user_principal_name}: ${changeData}` });
      }
    }
  }

  // Hier senden wir die Änderungen zurück an den Hauptthread.
  postMessage({ type: 'result', changes: changes });
});
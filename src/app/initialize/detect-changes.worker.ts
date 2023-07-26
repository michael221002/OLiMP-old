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
  const changeDate = new Date(); // Aktuelles Datum und Uhrzeit

  for (const key of keys) {
    if (current[key] !== next[key]) {
      const value: changedData = { keyName: key, oldKey: current[key], newKey: next[key], changeDate: changeDate };
      changeData.push(value);
    }
  }
  return changeData;
}

addEventListener('message', ({ data }) => {
  const files = data.files;
  const changes = [];

  for (let file = 0; file < files.length - 1; file++) {
    const currentFileData = files[file].jsonData;
    const nextFileData = files[file + 1].jsonData;

    for (let employee = 0; employee < currentFileData.length; employee++) {
      const currentEmployee = currentFileData[employee];
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

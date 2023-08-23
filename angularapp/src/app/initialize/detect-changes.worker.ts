/// <reference lib="webworker" />

import { changedData } from "../models/data-change.model";
import { InitializeFiles } from "../models/initialize-service.model";
import { tableScema } from "../models/table-Scema.model";
import { preChanges } from "../models/worker-changes.model";

function hasChanged(firstOne: tableScema, secOne: tableScema) {
  const keys = Object.keys(firstOne);
  for (const key of keys) {
    if (firstOne[key] !== secOne[key]) {
      return true;
    }
  }
  return false;
}

function changeMessage(current: tableScema, next: tableScema, date: string) {
  const changeData: changedData[] = [];
  const keys = Object.keys(current);

  for (const key of keys) {
    if (current[key] !== next[key]) {
      let value: changedData = { KeyName: key, OldKey: current[key], NewKey: next[key], ChangeDate: date };
      changeData.push(value);
    }
  }
  return changeData;
}

addEventListener('message', ({ data }) => {
  const files: InitializeFiles[] = data.files;
  const changes: preChanges[] = [];

  for (let file = 0; file < files.length - 1; file++) {
    const currentFileData: tableScema[] = files[file].jsonData;
    const nextFileData: tableScema[] = files[file + 1].jsonData;
     //nimmt also das Datum der nächsten Datei 
     let date = String(files[file + 1].fileDate)

    for (let employee = 0; employee < currentFileData.length; employee++) {
      let currentEmployee: tableScema= currentFileData[employee];
      let matchedEmployee: tableScema | undefined = nextFileData.find(
        (secondEmployee: tableScema) => currentEmployee.employeenumber === secondEmployee.employeenumber
      );
      

      if (matchedEmployee && hasChanged(currentEmployee, matchedEmployee)) {
        let changeData = changeMessage(currentEmployee, matchedEmployee, date);
        changes.push(new preChanges(currentEmployee, changeData));

        // Hier senden wir die Log-Nachrichten an den Hauptthread. with log
        //postMessage({ type: 'log', message: `${currentEmployee.user_principal_name}: ${changeData}` });
      }
    }
  }

  // Hier senden wir die Änderungen zurück an den Hauptthread.
  postMessage({ type: 'result', changes: changes });
});

import { appendDelete } from "../utils/append.element.js";

export function createTableAndMail(result) {
  let table = document.querySelector('.table-section')
  let div = document.createElement('div');
  let mailFormDiv = document.createElement('div');
  mailFormDiv.classList.add('mail-form-container');
  div.classList.add('table-container')
  div.innerHTML = result;
  table.append(div);
  appendDelete(table)
}


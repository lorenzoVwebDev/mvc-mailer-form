import { appendDelete } from '../view/appendelement.view.js';
import { deleteLog } from './deleteLog.logfile.js';
import { submitMail } from './submit.mailform.js'; 
const server = 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/public/';
const local = 'http://mvc-mailer-form/public/'

export async function downloadTable(type){
    const response = await fetch(`${server}logs/table?type=${type}`)

    if (response.status >= 200 && response.status < 400) {
      const result = await response.text();
      return result;
    } else if (response.status >= 400 && response.status < 500 ){
      const error = response;
      throw new Error(error)
    } else {
      const error = response;
      throw new Error(error)
    }
}

export async function downloadTable2(type) {
  let tableBool = false;
  document.querySelector('.table-section').innerHTML = '';
  const response = await fetch(`${server}logs/table?type=${type}`)

  if (response.status >= 200 && response.status < 400) {
    tableBool = true;;
    const result = await response.text();
    createTableAndMail(result);
    submitMail();
    deleteLog(type);
  } else if (response.status >= 400 && response.status < 500 ){
    const error = response;
    return error
  } else {
    const error = response;
    return error;
  }
}
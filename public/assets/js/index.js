import { downloadLogFile } from './services/download.logfile.js';
import { deleteLog } from './services/deleteLog.logfile.js';
import { logEvent } from './services/logevent.logfile.js';
import { downloadTable } from './services/download.table.js'; 
import { submitMail } from './services/submit.mailform.js'
import { appendButtons, appendDelete } from './view/appendelement.view.js';
import { createTableAndMail } from "./view/table.view.js";
import { renderResponse } from './view/mailresponse.view.js'
const server = 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/public/';
const local = 'http://mvc-mailer-form/public/'
const url = server;

if (document.getElementById('mail-form')) {
  document.getElementById('mail-form').addEventListener('submit', async event => {
    try {
      const responseObject = await submitMail(event, url);
      const { response, result } = responseObject;
      renderResponse(response, result);
    } catch (error) {
      console.log(error)
    }
  })
}

document.querySelectorAll('.log-form').forEach(element => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const resultObject = await logEvent(event, url);
      const { result, type } = resultObject;
      const displayBool = appendButtons(result);
      if (!displayBool) throw new Error("Error 404");
        document.querySelector(`.${type}-download-button`).addEventListener('click', async (event) => {
        downloadLogFile(type, url) 
      })

      document.querySelector(`.${type}-table-button`).addEventListener('click', async (event) => {
        const result = await downloadTable(type, url);
        const table = createTableAndMail(result);
        appendDelete(table);
        attachDeleteListener(type, url)
      })
    } catch (err) {
      console.error(err)
    }
  })
})
//recursive function that call itself each time
function attachDeleteListener(type, url) {
  document.querySelectorAll('.delete-log').forEach( element => {
    element.addEventListener('click', async () => {
      await deleteLog(type, element, url);
      const result = await downloadTable(type, url);
      const table = createTableAndMail(result);
      appendDelete(table);
      attachDeleteListener(type, url)
    })
  })
}
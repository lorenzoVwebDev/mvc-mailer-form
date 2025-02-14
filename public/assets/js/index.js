import { downloadLogFile } from './services/download.logfile.js';
import { deleteLog } from './services/deleteLog.logfile.js';
import { logEvent } from './services/logevent.logfile.js';
import { downloadTable } from './services/download.table.js'; 
import { submitMail } from './services/submit.mailform.js'
import { appendButtons, appendDelete } from './view/appendelement.view.js';
import { createTableAndMail } from "./view/table.view.js";
import {renderResponse} from './view/mailresponse.view.js'
const server = 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/public/';
const local = 'http://mvc-mailer-form/public/'

if (document.getElementById('mail-form')) {
  document.getElementById('mail-form').addEventListener('submit', async event => {
    try {
      const responseObject = await submitMail(event);
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
      const resultObject = await logEvent(event);
      const { result, type } = resultObject;
      const displayBool = appendButtons(result);
      if (!displayBool) throw new Error("Error 404");
        document.querySelector(`.${type}-download-button`).addEventListener('click', async (event) => {
        downloadLogFile(type) 
      })

      document.querySelector(`.${type}-table-button`).addEventListener('click', async (event) => {
        const result = await downloadTable(type);
        const table = createTableAndMail(result);
        appendDelete(table);
        document.querySelectorAll('.delete-log').forEach(element => {
          
        })
      })
/*       downloadLogFile(type);
      new Promise((resolve, reject) => {
        downloadTable(type, resolve, reject);
      }).then(() => {
        submitMail()
        deleteLog(type);
      }).catch((error) => {
        throw new Error(error);
      })   */
    } catch (err) {
      console.error(err)
    }
  })
})
/* 
document.getElementById('mail-form').addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('Hello World')
}) */
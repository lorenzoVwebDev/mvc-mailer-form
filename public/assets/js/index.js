import { appendTable } from './utils/append.element.js';
import { downloadLogFile } from './services/download.logfile.js';
import { deleteLog } from './services/deleteLog.logfile.js';
import { downloadTable } from './services/download.table.js'; 
import { submitMail } from './services/submit.mailform.js'
const server = 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/public/';
const local = 'http://mvc-mailer-form/public/'

submitMail()

document.querySelectorAll('.log-form').forEach(element => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
    const formData = new FormData(event.target);
    const type = formData.getAll('type')[0];
    const response = await fetch(`${server}logs/${type}`, {
      method: 'POST',
      body: formData
    });
  
    if (response.status >= 200 && response.status < 400) {
      const result = await response.json();
      const displayBool = appendTable(result);
      if (!displayBool) throw new Error("Error 404");
      downloadLogFile(type);
      new Promise((resolve, reject) => {
        downloadTable(type, resolve, reject);
      }).then(() => {
        submitMail()
        deleteLog(type);
        
        
      }).catch((error) => {
        throw new Error(error);
      })  
  
    } else if (response.status >= 400 && response.status < 500 ){
      const error = response;
      throw new Error(response);
    } else {
      const error = response;
      throw new Error(response);
    }
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
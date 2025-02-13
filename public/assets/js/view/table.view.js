import { appendDelete } from "../utils/append.element.js";

export function createTableAndMail(result) {
  let table = document.querySelector('.table-section')
  let div = document.createElement('div');
  let mailFormDiv = document.createElement('div');
  mailFormDiv.classList.add('mail-form-container');
  div.classList.add('table-container')
  div.innerHTML = result;
  mailFormDiv.innerHTML = `
    <h1>Request Your Table via e-mail</h1>      
    <form id="mail-form">
          <div class="name">
            <h3>Name</h3>
            <input type="text" placeholder="Insert your name" pattern="[A-Za-z]+" minlenght="5" maxlenght="25" required/>
          </div>
          <div class="surname">
            <h3>Surname</h3>
            <input type="text" placeholder="Insert your Surname" pattern="[A-Za-z]+" minlenght="5" maxlenght="25" required/>
          </div>
          <div class="birthdate">
            <h3>Birthdate</h3>
            <input type="date"/>
          </div>
          <div class="social">
            <h3>Source</h3>
            <select id="mail-form">
              <option value="linkedin" selected>Linkendin</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
        <div> 
          <h3>e-mail</h3> 
          <input type="email" placeholder="insert your mail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required/>
        </div>
        <input type="text" value="mail" id="mail" hidden/>
        <input type="submit" value="Submit"/>
      </form>
    `  
  table.append(mailFormDiv, div);
  appendDelete(table)
}


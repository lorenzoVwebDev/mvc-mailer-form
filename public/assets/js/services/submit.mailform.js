const server = 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/public/';
const local = 'http://mvc-mailer-form/public/'

export function submitMail() {
if (document.getElementById('mail-form')) {
  document.getElementById('mail-form').addEventListener('submit', async event => {
    event.preventDefault()
    const formData = new FormData(event.target);
    let dataArray = []
    formData.forEach(data => {
      dataArray.push(data)
    })
/*     const controller = new AbortController();
    setTimeout(controller.abort(), 15000) */
    try {
      const response = await fetch(`${server}logs/sendtable`, {
        method: 'POST',
        body: JSON.stringify({
          name: dataArray[0],
          surname: dataArray[1],
          'log-date': dataArray[2],
          type: dataArray[3],
          mail: dataArray[4],
          'form-hidden': dataArray[5]
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(30000)
      })
      if (response.status >= 200 && response.status < 400) {
            const result = await response.text();
          } else if (response.status >= 400 && response.status < 500 ){
            const error = await response.json();
            if (document.querySelector('.error-log-message')) {
            document.querySelector('.error-log-message').remove()
            } 
            let div = document.createElement('div')
            div.classList.add('error-log-message');
            let h2 = document.createElement('h2');
            let h3 = document.createElement('h3');
            h2.innerHTML = '!!'+error.result + '!!' +'\n';
            h3.innerHTML+= 'Try another date, or create a current log file below'
            h3.style.textAlign = 'center';
            h2.style.textAlign = 'center';
            h2.style.color = 'red';
            h3.style.color = 'red';
            div.append(h2, h3)
            document.querySelector('.mail-section').append(div);
          } else {
            const error = response;
            console.log(error)
          }
    } catch (err) {
      console.error(err)
    }
  })
}
}


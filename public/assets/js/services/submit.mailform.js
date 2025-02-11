export function submitMail() {
if (document.getElementById('mail-form')) {
  document.getElementById('mail-form').addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target);
    let dataArray = []
    formData.forEach(data => {
      dataArray.push(data)
    })

    console.log(dataArray)
    const response = fetch('http://mvc-mailer-form/public/logs/sendtable', {
      method: 'POST',
      body: JSON.stringify({
        name: dataArray[0],
        surname: dataArray[1],
        birthdate: dataArray[2],
        type: dataArray[3],
        mail: dataArray[4],
        'form-hidden': dataArray[5]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
}

}


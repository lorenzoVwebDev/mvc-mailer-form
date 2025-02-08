export function submitMail() {
if (document.getElementById('mail-form')) {
  document.getElementById('mail-form').addEventListener('submit', event => {

    event.preventDefault()
    console.log('hello world');
  
  })
}

}


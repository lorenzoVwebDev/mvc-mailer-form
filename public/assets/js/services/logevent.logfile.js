const server = 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/public/';
const local = 'http://mvc-mailer-form/public/'

export async function logEvent(event) {
  const formData = new FormData(event.target);
  const type = formData.getAll('type')[0];
  const response = await fetch(`${local}logs/${type}`, {
    method: 'POST',
    body: formData
  });

  if (response.status >= 200 && response.status < 400) {
    const result = await response.json();
    return {
      result,
      type
    };
  } else if (response.status >= 400 && response.status < 500 ){
    const error = response;
    throw new Error(response);
  } else {
    const error = response;
    throw new Error(response);
  }
}
import "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js";

export async function downloadLogFile(type, serverUrl) {
  console.log(type)
  const blob = await fetch(`${serverUrl}download/downloadlogs/${type}?type=${type}`).then((response) => response.blob());
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${dayjs().format('DDMMYY')}${type}_logs.log`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}


/* fetch(`http://logs-table-reader-mvc/public/download/downloadlogs/exception?potato=4&carrot=5/`, {
  headers: {
    "Content-Type": "application/json"
  }
}).then(response => response.json());

 */
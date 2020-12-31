// import moment from 'moment';
export function setItem(key, value) {
  window.localStorage.setItem(key, value);
}
export function getItem(key) {
  return window.localStorage.getItem(key);
}
export function removeItem(key) {
  window.localStorage.removeItem(key);
}
export function clearLocalStorage() {
  window.localStorage.clear();
}

export function generateReference() {
  var date = Date.now();
  return `#${date.toString().substring(0, 9)}`;
}

// export function formatDate(date) {
//    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
// }

export function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

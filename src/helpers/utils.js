// import moment from 'moment';
import { v4 as uuidv4 } from "uuid";

export const uuid = () => uuidv4();

export function setItem(key, value, storage = "local") {
  if (storage === "local") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
export function getItem(key, storage = "local") {
  if (storage === "local") return JSON.parse(window.localStorage.getItem(key));
  return JSON.parse(window.sessionStorage.getItem(key));
}
export function removeItem(key, storage = "local") {
  if (storage === "local") {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.removeItem(key);
  }
}
export function clearLocalStorage(storage = "local") {
  if (storage === "local") {
    window.localStorage.clear();
  } else {
    window.sessionStorage.clear();
  }
}

export function generateReference() {
  var date = Date.now();
  return `#${date.toString().substring(0, 9)}`;
}

export const getPng = (name) => {
  return require(`../assets/images/${name}.png`);
};

export const getUrlParam = (param) => {
  return new URLSearchParams(window.location.search).get(param) || "/";
};

export const getLastPathname = (pathname) => {
  const pathList = pathname.split("/");
  return pathList[pathList.length - 1];
};

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

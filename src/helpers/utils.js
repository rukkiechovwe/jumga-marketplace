import { v4 as uuidv4 } from "uuid";
var forge = require("node-forge");
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

export function getReference() {
  var date = Date.now();
  return `${date.toString().substring(0, 9)}`;
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
export const getSlug = (payload) => {
  if (payload) {
    let ls = payload.split(" ");
    ls = ls.map((item) => item.toLowerCase());
    return ls && ls.join("-");
  }
  return null;
};

export const getFileSize = (number) => {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
};

export const encrypt = (payload) => {
  var cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(process.env.REACT_APP_ENCRYPTION_KEY)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(JSON.stringify(payload), "utf-8"));
  cipher.finish();
  var encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
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

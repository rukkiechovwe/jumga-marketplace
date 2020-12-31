// api base_url
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-jumga-marketplace.cloudfunctions.net"
    : "https:localhost:4000";
const sendHttpRequest = async (method, url, data) => {
  try {
    if (method === "GET" || method === "DELETE") {
      const response = await fetch(url, {
        method: method,
        headers: {},
      });
      return await response.json();
    }
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

const get = async (url) => await sendHttpRequest("GET", url, null);
const post = async (url, data) => await sendHttpRequest("POST", url, data);

export { post, get, BASE_URL };

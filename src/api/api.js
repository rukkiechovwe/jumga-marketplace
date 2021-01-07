const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-jumga-marketplace.cloudfunctions.net/jumga-marketplace/us-central1"
    : "http://localhost:5001/jumga-marketplace/us-central1";
const BASENAME =
  process.env.NODE_ENV === "production"
    ? "https://jumga-marketplace.netlify.app"
    : "https://localhost:3000";

const sendHttpRequest = async (method, endpoint, data) => {
  try {
    if (method === "GET" || method === "DELETE") {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: method,
      });
      return await response.json();
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

const get = async (endpoint) => await sendHttpRequest("GET", endpoint, null);
const post = async (endpoint, data) =>
  await sendHttpRequest("POST", endpoint, data);

export { post, get, BASENAME };

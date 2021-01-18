const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://cryptic-everglades-67691.herokuapp.com/api"
    : "http://localhost:8080/api";
const BASENAME =
  process.env.NODE_ENV === "production"
    ? "https://jumga.xyz"
    : "https://localhost:3000";

const sendHttpRequest = async (method, endpoint, data) => {
  try {
    if (method === "GET" || method === "DELETE") {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { status: "error", err: error };
  }
};

const get = async (endpoint) => await sendHttpRequest("GET", endpoint, null);
const post = async (endpoint, data) =>
  await sendHttpRequest("POST", endpoint, data);

export { post, get, BASENAME };

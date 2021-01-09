import { post } from "./api";

export const initPayment = async (payload) => {
  try {
    const res = await post("/initPayment", { client: payload });
    if (res.status === "error") return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};
export const validatePayment = async (payload) => {
  try {
    const res = await post("/validatePayment", payload);
    if (res.status === "error") return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};

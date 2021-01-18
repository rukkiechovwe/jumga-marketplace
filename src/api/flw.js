import { post } from "./api";

export const initPayment = async (payload) => {
  try {
    const res = await post("/init-payment", { client: payload });
    if (res.status === "error") return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};

export const validatePayment = async (payload) => {
  try {
    const res = await post("/validate-payment", payload);
    if (res.status === "error") return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};
export const exchangeRate = async (payload) => {
  const { from } = payload;
  const toOptions = ["NGN", "GHS", "KES", "EUR"];
  payload.to = toOptions.filter((option) => option !== from);
  try {
    const res = await post("/exchange-rate", payload);
    if (res.status === "error" || res.err) return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};

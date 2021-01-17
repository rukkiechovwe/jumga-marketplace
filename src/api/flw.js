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
  const to = toOptions.filter((option) => option !== from);
  payload.to = to;
  try {
    const res = await post("/exchange-rate", payload);
    console.log(res);
    if (res.status === "error") return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};

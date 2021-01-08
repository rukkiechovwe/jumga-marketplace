import { post } from "./api";
export const initPayment = async (details) => {
  try {
    const res = await post("/initPayment", { client: details });
    return res;
  } catch (error) {
    return { err: error };
  }
};

import { post } from "./api";

export const createPendingShop = async (payload) => {
  try {
    const res = await post("/createShop", payload);
    if (res.status === "error") return { err: res.message ?? res.status };
    return res;
  } catch (error) {
    return { err: error };
  }
};

export const updatePendingShop = async (payload) => {
  try {
    const res = await post("/updateShop", { shopId: payload });
    if (res.status === "error") return { err: res.message };
    return res;
  } catch (error) {
    return { err: error };
  }
};

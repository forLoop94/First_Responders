import customFetch from "../utils/customFetch";

export const getPaymentUrl = async (params: any) => {
  const response = await customFetch.get(`/payments/${params}`);
  return response.data;
};

export const verifyPaystackPayment = async (payload: any) => {
  const response = await customFetch.patch("/payments/verify-payment", payload);
  return response.data;
};

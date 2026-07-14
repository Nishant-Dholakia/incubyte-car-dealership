import api from "./api";

export async function createDiscount(data) {
  const response = await api.post("/discounts", data);
  return response.data;
}

export async function getAllDiscounts() {
  const response = await api.get("/discounts");
  return response.data;
}

export async function deleteDiscount(id) {
  const response = await api.delete(`/discounts/${id}`);
  return response.data;
}

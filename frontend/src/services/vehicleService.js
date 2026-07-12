import api from "./api";

export async function getAllVehicles() {
  const response = await api.get("/vehicles");
  return response.data;
}

export async function searchVehicles(filters) {
  const params = {};
  if (filters) {
    if (filters.make && filters.make.trim()) params.make = filters.make.trim();
    if (filters.model && filters.model.trim()) params.model = filters.model.trim();
    if (filters.category && filters.category.trim()) params.category = filters.category.trim();
    if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== "") {
      params.minPrice = filters.minPrice;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== "") {
      params.maxPrice = filters.maxPrice;
    }
  }
  const response = await api.get("/vehicles/search", { params });
  return response.data;
}

export async function purchaseVehicle(id) {
  const response = await api.post(`/vehicles/${id}/purchase`);
  return response.data;
}

export async function addVehicle(data) {
  const response = await api.post("/vehicles", data);
  return response.data;
}

export async function updateVehicle(id, data) {
  const response = await api.put(`/vehicles/${id}`, data);
  return response.data;
}

export async function deleteVehicle(id) {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
}

export async function restockVehicle(id, quantity) {
  const response = await api.post(`/vehicles/${id}/restock`, { quantity });
  return response.data;
}

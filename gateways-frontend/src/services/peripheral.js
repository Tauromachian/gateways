import qs from "query-string";

import appApi from "./appApi";

export async function getPeripherals(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`peripheral?${stringifiedFilters}`);
  return data;
}

export async function getPeripheral(id) {
  const { data } = await appApi.get(`peripheral/${id}`);
  return data;
}

export async function addPeripheral(form) {
  const { data } = await appApi.post(`peripheral`, form);
  return data;
}

export async function updatePeripheral(id, form) {
  const { data } = await appApi.put(`peripheral/${id}`, form);
  return data;
}

export async function deletePeripheral(id) {
  const response = await appApi.delete(`peripheral/${id}`);

  return response.data.name;
}

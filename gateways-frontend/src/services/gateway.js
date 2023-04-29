import qs from "query-string";

import appApi from "./appApi";

export async function getGateways(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`gateways?${stringifiedFilters}`);
  return data;
}

export async function getGateway(id) {
  const { data } = await appApi.get(`gateways/${id}`);
  return data;
}

export async function addGateway(form) {
  const { data } = await appApi.post(`gateways`, form);
  return data;
}

export async function updateGateway(id, form) {
  const { data } = await appApi.patch(`gateways/${id}`, form);
  return data;
}

export async function deleteGateway(id) {
  const response = await appApi.delete(`gateway/${id}`);

  return response.data.name;
}

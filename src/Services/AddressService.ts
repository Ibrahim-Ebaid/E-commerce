// services/AddressService.js
const API_BASE = "https://ecommerce.routemisr.com/api/v1/addresses";

export const getAllAddresses = async (token) => {
  const res = await fetch(API_BASE, {
    headers: { token }
  });
  return res.json();
};

export const getAddressById = async (id, token) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: { token }
  });
  return res.json();
};

export const addAddress = async (address, token) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token
    },
    body: JSON.stringify(address)
  });
  return res.json();
};

export const removeAddress = async (id, token) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { token }
  });
  return res.json();
};

import axios from "axios";

const API_URL = "http://localhost:5000/api/cars/";

const getCars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addCar = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

const editCar = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + id, goalData, config);
  return response.data;
};

const removeCar = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const carServices = {
    getCars,
    addCar,
    editCar,
    removeCar,
};

export default carServices;

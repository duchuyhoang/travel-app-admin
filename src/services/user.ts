import axios from "../config/axios";

export const getUsers = async (payload: { limit: number; offset: number }) => {
  try {
    const response = await axios.get("/admin/users", {
      params: payload,
    });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const deleteUser = async (id_user: string) => {
  try {
    const response = await axios.delete(`/admin/users/${id_user}`);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

import axios from "../config/axios";

export const login = async (payload: { email: string; password: string }) => {
  try {
    const response = await axios.post("/user/login", payload);
    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

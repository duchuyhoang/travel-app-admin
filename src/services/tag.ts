import axios from "../config/axios";

export const getTags = async (payload: { limit: number; offset: number }) => {
  try {
    const response = await axios.get("/tag", {
      params: payload,
    });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const createTag = async (payload: {
  tags: Array<{
    tag_name: string;
    tag_description: string;
  }>;
}) => {
  try {
    const response = await axios.post("/tag", payload);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

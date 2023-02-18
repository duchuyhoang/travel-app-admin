import axios from "../config/axios";
import { ORDER_BY, POST_STATUS } from "../enums/index";
interface IGetPost {
  limit: number;
  offset: number;
  orderBy?: ORDER_BY | string;
}

export const getPosts = async (payload: IGetPost) => {
  try {
    const response = await axios.get("/post/byUser", {
      params: payload,
    });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const changePostStatus = async (payload: {
  id_post: string;
  status: POST_STATUS;
}) => {
  try {
    const { id_post, status } = payload;
    const response = await axios.patch(`/admin/post/${id_post}`, { status });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const deletePost = async ({ id_post }: { id_post: string }) => {
  try {
    const response = await axios.delete(`/post/${id_post}`);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const statiscalPost = async ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const response = await axios.get(`/admin/postByTime`, {
      params: {
        start: parseInt((new Date(startDate).getTime() / 1000).toString()),
        end: parseInt((new Date(endDate).getTime() / 1000).toString()),
      },
    });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

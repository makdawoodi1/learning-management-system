import axios from "axios";
import { omit } from "lodash";
import { API_URL } from "../../config/config";

const userAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosBaseQuery = async (requestOpts, { getState }) => {
  try {
    const token = getState().authSlice.accessToken;
    const result = await userAxiosInstance({
      ...requestOpts,
      headers: {
        ...omit(requestOpts.headers, ["user-agent"]),
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

export const userBaseQuery = axiosBaseQuery();

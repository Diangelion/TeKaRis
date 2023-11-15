import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

export const axiosClientFile = axios.create({
  baseURL: import.meta.env.VITE_RANDOM_INDO_WORD_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export async function get(url: string, config?: any) {
  try {
    const response = await axiosClient.get(url, config);
    return response;
  } catch (error) {
    return error;
  }
}

export async function post(url: string, data?: any): Promise<any> {
  try {
    const response = await axiosClient.post(url, data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function postFile(url: string, data?: any): Promise<any> {
  try {
    const response = await axiosClientFile.post(url, data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function put(url: string, data?: any) {
  try {
    const response = await axiosClient.put(url, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function del(url: string, params?: any) {
  try {
    const response = await axiosClient.delete(url, { params });
    return response;
  } catch (error) {
    return error;
  }
}

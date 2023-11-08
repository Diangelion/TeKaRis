import axios from "axios";
// import useAuth from "../../hook/useAuth";

const TOKEN = localStorage.getItem("access_token");

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json" || "multipart/form-data",
    Accept: "application/json" || "multipart/form-data",
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

export const axiosClientFile = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

export async function get(url: string, params?: any) {
  try {
    const response = await axiosClient.get(url, { params });
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
    console.log(TOKEN);
    return error;
  }
}

export async function postFile(url: string, data?: any): Promise<any> {
  try {
    const response = await axiosClientFile.post(url, data);
    return response.data;
  } catch (error) {
    console.log(TOKEN);
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

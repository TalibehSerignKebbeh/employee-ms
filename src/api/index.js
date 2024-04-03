import axios from "axios";

export const apiInstance = (token) => axios.create({ baseURL: `${process.env.REACT_APP_API_URL}`, headers: { "authorization": `Bearer ${token}`  }, withCredentials: true })
export const ImgUrl = `${process.env.REACT_APP_API_URL}/images`
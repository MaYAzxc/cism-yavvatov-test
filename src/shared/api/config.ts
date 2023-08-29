import axios from "axios";
import { createHttp } from "effector-http-api";

const commonInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const http = createHttp(commonInstance);

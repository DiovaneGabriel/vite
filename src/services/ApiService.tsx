import { AxiosRequestConfig } from "axios";

import http from "../http-common";
import { Payload } from "../types/Common.types";

export const apiRequest = {
    post: (url: string, formData: Payload, config?: AxiosRequestConfig) => {
        return http.post(url, formData, config);
    },
    get: (url: string, config?: AxiosRequestConfig) => {
        return http.get(url, config);
    },
    delete: (url: string, config?: AxiosRequestConfig) => {
        return http.delete(url, config);
    }
};
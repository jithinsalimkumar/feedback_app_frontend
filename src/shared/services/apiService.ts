import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { environment } from "../../core/config/environment";
import { toast } from "sonner";
interface ApiError {
    message: string;
    status?: number;
    data?: unknown;
}

const apiService = axios.create({
    baseURL: environment.apiUrl,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiService.interceptors.request.use(
    (config) => {

        if (!environment.apiUrl) {
            throw new Error("Missing API URL in environment config");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: AxiosError) => {
        const apiError: ApiError = {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        };

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error("Unauthorized.");
                    break;
                case 403:
                    toast.error("Forbidden.");
                    break;
                case 404:
                    toast.error("Not Found.");
                    break;
                default:
                    toast.error(`API Error: ${error.response.status}`);
            }
        }

        return Promise.reject(apiError);
    }
);

export const api = {
    GET: <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> =>
        apiService.get<T, T>(url, config),

    // Post Request
    POST: <T, B>(url: string, data: B, config: AxiosRequestConfig = {}): Promise<T> =>
        apiService.post<T, T>(url, data, config),

    // Put Request
    PUT: <T>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> =>
        apiService.put<T, T>(url, data, config),

    // Delete Request
    DELETE: <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> =>
        apiService.delete<T, T>(url, config),

    // Patch Request
    PATCH: <T>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> =>
        apiService.patch<T, T>(url, data, config),
};

export default api;
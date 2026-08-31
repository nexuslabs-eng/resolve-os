import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (err: AxiosError) => {
        const responseData = err.response?.data as 
        | {
            error?: {
                code?: string;
                message?: string;
            };
        }
        | undefined;

        return Promise.reject(({
            message: 
            responseData?.error?.message ??
            err.message ??
            'An unexpected error occurred',

            code: responseData?.error?.code,
            status: err.response?.status ?? 500,
            data: err.response?.data ?? null,
        }));
    } ,
);
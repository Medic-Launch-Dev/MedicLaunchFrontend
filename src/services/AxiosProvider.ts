import axios, { AxiosInstance } from 'axios';

export default class AxiosProvider {
    public defaultInstance: AxiosInstance;

    constructor() {
        this.defaultInstance = axios;
        this.defaultInstance.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        // Add an interceptor to handle 401 responses. If we get a 401 response, we'll redirect the user to the login page.
        this.defaultInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const currentUrl = window.location.href;
                if (error?.response?.status === 401 && !currentUrl.includes('/login') && !currentUrl.includes('/register')) {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }
}
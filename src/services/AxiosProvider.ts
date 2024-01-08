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
    }
}
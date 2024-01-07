import axios, { AxiosInstance } from 'axios';

export default class AxiosProvider {
    public defaultInstance: AxiosInstance;

    constructor() {
        this.defaultInstance = axios;

        // TODO: add interceptors
    }
}
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import IHttpServiceClient from "../../../domain/Contracts/IHttpServiceClient";
import { injectable } from "inversify";

@injectable()
export default class HttpServiceClient implements IHttpServiceClient {
    private _serviceInstance: AxiosInstance | null = null;
    
    constructor() {
        if (!this._serviceInstance) {
            this.init();
        }
    }

    public get = async (path: string, useAuthorization: boolean): Promise<any> => {
        const { data } = await this.getInstance().get(path);
        return data;
    }

    public post = async (path: string, body: any): Promise<any> => {
        const { data } = await this.getInstance().post(path, body);
        return data;
    }

    public patch = async (path: string, body: any): Promise<any> => {
        const { data } = await this.getInstance().patch(path, body);
        return data;
    }

    public put = async (path: string, body: any): Promise<any> => {
        const { data } = await this.getInstance().put(path, body);
        return data;
    }

    public delete = async (path: string, body: any): Promise<any> => {
        const { data } = await this.getInstance().patch(path);
        return data;
    }

    private handleError(response: any): any {
        console.log(response);
    }

    private init(): AxiosInstance {
        const service = axios.create({ withCredentials: true });
        service.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        service.defaults.headers.common['Accept'] = 'application/json';

        service.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;
                return this.handleError(response);
            }
        );

        this._serviceInstance = service;
        return service;
    }

    private getInstance(): AxiosInstance {
        if (this._serviceInstance) {
            return this._serviceInstance;
        } else {
            return this.init();
        }
    }
}

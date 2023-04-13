import axios, { AxiosInstance, AxiosResponse } from "axios";
import { injectable } from "inversify";
import IHttpServiceClient from "../../../domain/Contracts/IHttpServiceClient";
import ProblemResponseDto from "../../../domain/Models/ProblemResponseDto";
import { contentTypeEnum } from "../../../components/httpUtils/ContentType";

@injectable()
export default class HttpServiceClient implements IHttpServiceClient {
    private _serviceInstance: AxiosInstance | null = null;
    constructor() {
        if (!this._serviceInstance) {
            this.init();
        }
    }

    public async get(path: string, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse> {
        return await this.getInstance().get(path, { headers: this.getHeaders(bearerToken, suscriptionKey) });
    }

    public async post(path: string, body?: any, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse> {
        return await this.getInstance().post(path, body, { headers: this.getHeaders(bearerToken, suscriptionKey) });
    }

    public async patch(path: string, body?: any, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse> {
        return await this.getInstance().patch(path, body, { headers: this.getHeaders(bearerToken, suscriptionKey) });
    }

    public async put(path: string, body?: any, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse> {
        const { data } = await this.getInstance().put(path, body, { headers: this.getHeaders(bearerToken, suscriptionKey) });
        return data;
    }

    public async delete(path: string, bearerToken: string, suscriptionKey: string): Promise<AxiosResponse> {
        return await this.getInstance().patch(path, { headers: this.getHeaders(bearerToken, suscriptionKey) });
    }

    private handleError(response: any): any {
        return response.data;
    }

    private init(): AxiosInstance {
        const service = axios.create({ withCredentials: true });
        service.defaults.headers.common['Content-Type'] = contentTypeEnum.json;
        service.defaults.headers.common['Accept'] = contentTypeEnum.json;

        service.interceptors.response.use(
            (response) => response,
            (error) => {
                const { message, code, response, request } = error;
                let problemResponse: AxiosResponse;

                if (!response) {
                    problemResponse = {
                        data: new ProblemResponseDto(503, code, message),
                        status: 503,
                        statusText: "Service Failure",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        config: null,
                        request: request
                    };
                } else {
                    problemResponse = response
                }

                return problemResponse;
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

    private getHeaders(bearerToken: string, suscriptionKey: string): any {
        const headersRequest: any = {
            'Content-Type': 'application/json'
        };

        if (bearerToken) {
            headersRequest['Authorization'] = `Bearer ${bearerToken}`;
        }

        if (suscriptionKey) {
            headersRequest['Ocp-Apim-Subscription-Key'] = suscriptionKey;
        }

        return headersRequest
    }
}

import { AxiosResponse } from "axios";

export default interface IHttpServiceClient {
    /**
     * 
     * @param path 
     * @param bearerToken 
     * @param suscriptionKey 
     */
    get(path: string, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse>;

    /**
     * 
     * @param path 
     * @param body 
     * @param bearerToken 
     * @param suscriptionKey 
     */
    post(path: string, body?: any, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse>;

    /**
     * 
     * @param path 
     * @param body 
     * @param bearerToken 
     * @param suscriptionKey 
     */
    put(path: string, body?: any, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse>;

    /**
     * 
     * @param path 
     * @param bearerToken 
     * @param suscriptionKey 
     */
    delete(path: string, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse>;

    /**
     * 
     * @param path 
     * @param body 
     * @param bearerToken 
     * @param suscriptionKey 
     */
    patch(path: string, body?: any, bearerToken?: string, suscriptionKey?: string): Promise<AxiosResponse>;
}
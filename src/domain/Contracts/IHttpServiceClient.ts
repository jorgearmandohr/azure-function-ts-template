export default interface IHttpServiceClient {
    get(path: string, useAuthorization: boolean) : Promise<any>;
}
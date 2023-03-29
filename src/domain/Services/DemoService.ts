import { inject, injectable } from "inversify";
import { IDemoService } from "../Contracts/IDemoService";
import IHttpServiceClient from "../Contracts/IHttpServiceClient";

@injectable()
export default class DemoService implements IDemoService {
    private _httpService: IHttpServiceClient;
    constructor( @inject(Symbol.for('IHttpServiceClient')) httpService: IHttpServiceClient) {
        this._httpService = httpService;
    }

    greet = async (param: string): Promise<string> => {
        let result = this._httpService.get(`https://93daa357-5472-46cd-abf5-f674fd2c0686.mock.pstmn.io/orders/sales?name=${param}`, true);
        return result;
    }
}
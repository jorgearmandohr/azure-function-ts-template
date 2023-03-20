import { inject, injectable } from "inversify";
import { IDemoService } from "../Contracts/IDemoService";
import IHttpServiceClient from "../Contracts/IHttpServiceClient";

@injectable()
export default class DemoService implements IDemoService {
    private _httpService: IHttpServiceClient;
    constructor( @inject(Symbol.for('IHttpServiceClient')) httpService: IHttpServiceClient) {
        this._httpService = httpService;
    }

    greet = async (): Promise<string> => {
        let result = this._httpService.get('https://api.publicapis.org/entries', true);
        return result;
    }
}
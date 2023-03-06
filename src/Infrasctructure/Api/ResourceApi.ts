import { Context, HttpRequest } from "@azure/functions"
import { inject, injectable } from "inversify";
import { IDemoService } from "../../domain/Contracts/IDemoService";
import SampleResponse from "../../domain/Models/SampleResponse";
import IResourceApi from "./IResourceApi";

@injectable()
export default class ResourceApi implements IResourceApi {
    private _demoService : IDemoService
    constructor(@inject(Symbol.for('IDemoService'))demoService: IDemoService) {
        this._demoService = demoService;
     }

    get = async (req: HttpRequest): Promise<SampleResponse> => {
        const name = (req.query.name || (req.body && req.body.name));
        const responseMessage = name
            ? "Hello, " + name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        return new SampleResponse(200, responseMessage);
    }
}

import { inject, injectable } from "inversify";
import { IDemoService } from "../../domain/Contracts/IDemoService";
import SampleResponse from "../../domain/Models/SampleResponse";
import IResourceApi from "./IResourceApi";
import SampleResource from "../../domain/Models/SampleResourceModel";

@injectable()
export default class ResourceApi implements IResourceApi {
    private _demoService : IDemoService
    constructor(@inject(Symbol.for('IDemoService'))demoService: IDemoService) {
        this._demoService = demoService;
     }

    get = async (req:SampleResource): Promise<SampleResponse> => {
        const validationErros = await req.validate();
        if(validationErros.length > 0)
        {
            return new SampleResponse(400, validationErros.join(','));
        }

        const responseMessage = req.name
            ? "Hello, " + req.name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        return new SampleResponse(200, responseMessage);
    }
}

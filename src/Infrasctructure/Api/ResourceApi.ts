import { inject, injectable } from "inversify";
import { IDemoService } from "../../domain/Contracts/IDemoService";
import SampleResponse from "../../domain/Models/SampleResponse";
import IResourceApi from "./IResourceApi";
import SampleResource from "../../domain/Models/SampleResourceModel";
import ILogService from "../../domain/Contracts/ILogService";

@injectable()
export default class ResourceApi implements IResourceApi {
    private _demoService : IDemoService;
    private _logger : ILogService;

    constructor(
        @inject(Symbol.for('IDemoService'))demoService: IDemoService,
        @inject(Symbol.for('ILogService'))logger: ILogService) {
        this._demoService = demoService;
        this._logger = logger;
     }

    get = async (req:SampleResource): Promise<SampleResponse> => {
        this._logger.info("ok, esto funciona");
        const validationErros = await req.validate();
        if(validationErros.length > 0)
        {
            return new SampleResponse(400, validationErros.join(','));
        }

        const responseMessage = await this._demoService.greet();
        //  req.name
        //     ? "Hello, " + req.name + ". This HTTP triggered function executed successfully."
        //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        return new SampleResponse(200, responseMessage);
    }
}

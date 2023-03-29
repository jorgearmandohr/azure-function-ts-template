import { inject, injectable } from "inversify";
import { IDemoService } from "../../domain/Contracts/IDemoService";
import SampleResponse from "../../domain/Models/SampleResponse";
import IResourceApi from "./IResourceApi";
import SampleResource from "../../domain/Models/SampleResource";
import ILogService from "../../domain/Contracts/ILogService";
import ProblemResponseDto from "../../domain/Models/ProblemResponseDto";

@injectable()
export default class ResourceApi implements IResourceApi {
    private readonly _demoService : IDemoService;
    private readonly _logger : ILogService;

    constructor(
        @inject(Symbol.for('IDemoService'))demoService: IDemoService,
        @inject(Symbol.for('ILogService'))logger: ILogService) {
        this._demoService = demoService;
        this._logger = logger;
     }

    get = async (req:SampleResource): Promise<any> => {
        this._logger.info("ok, esto funciona");
        this._logger.warn("Este es un ejemplo de warn");
        const isValid = await req.validate();
        if(!isValid)
        {
            return new ProblemResponseDto(400, req.validationErrors.join(','));
        }

        const responseMessage = await this._demoService.greet(req.name);

        return new SampleResponse(200, responseMessage);
    }
}

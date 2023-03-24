import { inject, injectable } from "inversify";
import { IDemoService } from "../../domain/Contracts/IDemoService";
import SampleResponse from "../../domain/Models/SampleResponse";
import IResourceApi from "./IResourceApi";
import SampleResource from "../../domain/Models/SampleResourceModel";
import ILogService from "../../domain/Contracts/ILogService";
import ProblemResponseDto from "../../domain/Models/ProblemResponseDto";

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

    get = async (req:SampleResource): Promise<any> => {
        this._logger.info("ok, esto funciona");
        this._logger.warn("Este es un ejemplo de warn");
        const validationErros = await req.validate();
        if(validationErros.length > 0)
        {
            return new ProblemResponseDto(400, validationErros.join(','));
        }

        const responseMessage = await this._demoService.greet();

        return new SampleResponse(200, responseMessage);
    }
}
